import { spawn } from 'child_process';
import { TerminalSession, CommandExecutionResult, ActiveSession } from './types';
import Vers from 'vers';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { NodeSSH } from 'node-ssh';

interface CompletedSession {
    pid: number;
    output: string;
    exitCode: number | null;
    startTime: Date;
    endTime: Date;
}

export const DEFAULT_COMMAND_TIMEOUT = 1000; // milliseconds

export class TerminalManager {
    private sessions: Map<number, TerminalSession> = new Map();
    private completedSessions: Map<number, CompletedSession> = new Map();

    async executeCommand(client: Vers, args: Record<string, unknown> | undefined): Promise<CommandExecutionResult> {
        if (!args || typeof args['vm_id'] !== 'string' || typeof args['command'] !== 'string') {
            throw new Error('VM ID and command are required for execution.');
        }

        const { vm_id, command } = args;

        try {
            // 1. Get VM details to retrieve SSH port
            const vm = await client.api.vm.retrieve(vm_id);

            if (!vm?.network_info?.ssh_port) {
                throw new Error('SSH port is not available for this VM.');
            }

            // 2. Get SSH Key
            const sshKey = await client.api.vm.getSSHKey(vm_id);

            if (!sshKey) {
                throw new Error('Failed to retrieve SSH key for the VM.');
            }

            // 3. Save SSH key to a temporary file
            const tmpDir = tmpdir();
            const keyPath = join(tmpDir, `ssh_key_${vm_id}`); // Unique key path
            await writeFile(keyPath, sshKey, { mode: 0o600 }); // Ensure proper permissions

            // 4. Create a session ID for tracking
            const sessionId = Date.now();
            let output = '';

            const sshClient = new NodeSSH();

            // Create and store the session
            const session: TerminalSession = {
                pid: sessionId,
                lastOutput: '',
                isBlocked: false,
                startTime: new Date(),
                sshClient: sshClient,         // Store the SSH client
                sshCommandId: command         // Store original command for reference
            };

            this.sessions.set(sessionId, session);

            // 5. Execute command via SSH
            const hostIP = client.versURL; // Assuming versURL is the host IP
            const sshPort = vm.network_info.ssh_port;


            await sshClient.connect({
                host: hostIP,
                port: sshPort,
                username: 'root',
                privateKeyPath: keyPath
            });

            const prefixedCommand = `vers-claude -p "${command.replace(/"/g, '\\"')}"`;
            console.error('command string is:', prefixedCommand);

            // Execute command with streaming support
            let stdoutData = '';
            let stderrData = '';


            // Execute SSH command
            const sshPromise = sshClient.execCommand(prefixedCommand, {
                onStdout: (chunk) => {
                    const data = chunk.toString('utf8');
                    stdoutData += data;
                    output += data;
                    session.lastOutput += data;
                    console.error('stdout: ' + data);
                },
                onStderr: (chunk) => {
                    const data = chunk.toString('utf8');
                    stderrData += data;
                    output += data;
                    session.lastOutput += data;
                    console.error('stderr: ' + data);
                }
            });

            // Get the result even if timeout occurred
            const result = await sshPromise;
            console.error('result is:', result);

            // 6. Clean up
            await unlink(keyPath);

            // Mark session as completed
            this.completedSessions.set(sessionId, {
                pid: sessionId,
                output: output,
                exitCode: result.code,
                startTime: session.startTime,
                endTime: new Date()
            });

            // Keep only last 100 completed sessions
            if (this.completedSessions.size > 100) {
                const oldestKey = Array.from(this.completedSessions.keys())[0];
                if (oldestKey) this.completedSessions.delete(oldestKey);
            }

            this.sessions.delete(sessionId);

            // Return both stdout and stderr
            return {
                pid: sessionId,
                isBlocked: session.isBlocked,
                output: output,
                error: stderrData || result.stderr
            };
        } catch (error: any) {
            console.error('Error executing command via SSH:', error);
            throw new Error(`Failed to execute command: ${error.message}`);
        }
    }

    getNewOutput(pid: number): string | null {
        // First check active sessions
        const session = this.sessions.get(pid);
        if (session) {
            const output = session.lastOutput;
            session.lastOutput = '';
            return output;
        }

        // Then check completed sessions
        const completedSession = this.completedSessions.get(pid);
        if (completedSession) {
            // Format completion message with exit code and runtime
            const runtime = (completedSession.endTime.getTime() - completedSession.startTime.getTime()) / 1000;
            return `Process completed with exit code ${completedSession.exitCode}\nRuntime: ${runtime}s\nFinal output:\n${completedSession.output}`;
        }

        return null;
    }

    forceTerminate(pid: number): boolean {
        const session = this.sessions.get(pid);
        if (!session) {
            return false;
        }

        try {
            // Execute a command to find and kill the process on the remote machine
            const killCommand = `pkill -f "${session.sshCommandId?.replace(/"/g, '\\"')}"`;
            if (session.sshClient) {

                session.sshClient.execCommand(killCommand).then(() => {
                    session.sshClient?.dispose(); // Close the SSH connection

                    // Add to completed sessions
                    this.completedSessions.set(pid, {
                        pid: pid,
                        output: session.lastOutput + "\nProcess terminated by user.",
                        exitCode: 130, // 130 is the exit code for SIGINT
                        startTime: session.startTime,
                        endTime: new Date()
                    });

                    this.sessions.delete(pid);
                });
            }
            else {
                throw new Error('No SSH client found for the session.');
            }
            return true;
        } catch (error) {
            // Convert error to string, handling both Error objects and other types
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`Failed to terminate process ${pid}:`, errorMessage);
            return false;
        }
    }

    listActiveSessions(): ActiveSession[] {
        const now = new Date();
        return Array.from(this.sessions.values()).map(session => ({
            pid: session.pid,
            isBlocked: session.isBlocked,
            runtime: now.getTime() - session.startTime.getTime()
        }));
    }

    listCompletedSessions(): CompletedSession[] {
        return Array.from(this.completedSessions.values());
    }
}

export const terminalManager = new TerminalManager();