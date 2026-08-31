export type CommandStatus =
  | "PROPOSED"
  | "AWAITING_AUTHORIZATION"
  | "AUTHORIZED"
  | "EXECUTING"
  | "SUCCEEDED"
  | "FAILED"
  | "BLOCKED"
  | "CANCELLED";

export type CommandType = "PMO_APPEND_COMMENT";

export type FounderCommand = {
  command_id: string;
  command_type: CommandType;
  source: "CONTROL_TOWER";
  target_system: "GITHUB_PMO";
  target_object: { repository: string; issue_number: number };
  requested_by: string;
  authorization: {
    required: true;
    authorized: boolean;
    authorized_at?: string;
  };
  created_at: string;
  status: CommandStatus;
  parameters: { comment: string };
  result?: {
    success: boolean;
    authoritative_reference?: string;
    timestamp?: string;
  };
  error?: { code: string; message: string; authoritative_source?: string };
  evidence_reference?: string;
  completed_at?: string;
};

export type ExecutionAdapter<TCommand extends FounderCommand = FounderCommand, TResult = unknown> = {
  validate(command: TCommand): Promise<void>;
  authorize(command: TCommand, actor: { id: string; role: string }): Promise<void>;
  execute(command: TCommand): Promise<TResult>;
  verify(command: TCommand, result: TResult): Promise<TResult>;
  normalizeResult(command: TCommand, result: TResult): FounderCommand["result"];
};

const ALLOWED_COMMANDS = new Set<CommandType>(["PMO_APPEND_COMMENT"]);
const ALLOWED_TARGET = { repository: "Crabionics/crabionics-pmo", issue_number: 39 } as const;

export function assertAllowedCommand(command: FounderCommand) {
  if (!ALLOWED_COMMANDS.has(command.command_type)) throw new Error("COMMAND_NOT_ALLOWLISTED");
  if (
    command.target_system !== "GITHUB_PMO" ||
    command.target_object.repository !== ALLOWED_TARGET.repository ||
    command.target_object.issue_number !== ALLOWED_TARGET.issue_number
  ) throw new Error("TARGET_NOT_ALLOWLISTED");
  if (!command.parameters.comment.trim()) throw new Error("COMMENT_REQUIRED");
}

export function makeCommandId(decisionId: string, commandType: CommandType, target: string) {
  return `fos:${decisionId}:${commandType}:${target}`;
}

export function founderExecutionNote(decisionId: string) {
  return [
    "Founder OS execution authorization recorded.",
    "",
    `Decision: ${decisionId}`,
    "Authorized action: proceed with the existing PMO commercial processor-validation track.",
    "Scope: authorization to proceed to actual external outreach under the existing PMO requirements.",
    "Boundary: this note does not claim that outreach has occurred, nor does it claim a customer response or commitment.",
  ].join("\\n");
}
