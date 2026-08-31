import { assertAllowedCommand, founderExecutionNote, makeCommandId } from "./execution-gateway";

describe("Founder OS execution gateway contract", () => {
  const base = {
    command_id: "fos:PMO-39:PMO_APPEND_COMMENT:39",
    command_type: "PMO_APPEND_COMMENT" as const,
    source: "CONTROL_TOWER" as const,
    target_system: "GITHUB_PMO" as const,
    target_object: { repository: "Crabionics/crabionics-pmo", issue_number: 39 },
    requested_by: "founder",
    authorization: { required: true, authorized: true, authorized_at: "2026-08-31T00:00:00Z" },
    created_at: "2026-08-31T00:00:00Z",
    status: "AUTHORIZED" as const,
    parameters: { comment: founderExecutionNote("PMO-39") },
  };

  it("creates a stable command id", () => {
    expect(makeCommandId("PMO-39", "PMO_APPEND_COMMENT", "39")).toBe(base.command_id);
  });

  it("accepts only the initial allowlisted command and target", () => {
    expect(() => assertAllowedCommand(base)).not.toThrow();
  });

  it("rejects an unknown command type", () => {
    expect(() => assertAllowedCommand({ ...base, command_type: "UNKNOWN" as never })).toThrow("COMMAND_NOT_ALLOWLISTED");
  });

  it("rejects a different PMO target", () => {
    expect(() => assertAllowedCommand({ ...base, target_object: { repository: "Crabionics/crabionics-pmo", issue_number: 40 } })).toThrow("TARGET_NOT_ALLOWLISTED");
  });

  it("keeps the execution note truthful", () => {
    const note = founderExecutionNote("PMO-39");
    expect(note).toContain("authorization to proceed to actual external outreach");
    expect(note).toContain("does not claim that outreach has occurred");
    expect(note).not.toContain("customer response");
  });
});
