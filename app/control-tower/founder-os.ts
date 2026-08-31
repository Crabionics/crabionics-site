export type FounderEvidence = {
  source: string;
  authority: string;
  status: "KNOWN" | "OBSERVED" | "INFERRED" | "UNKNOWN" | "NEEDS_EXPERIMENT";
};

export type FounderDecision = {
  id: string;
  question: string;
  whyNow: string;
  recommendation: string;
  evidence: FounderEvidence;
  actionLabel: string;
  actionHref: string;
};

export const founderDecisions: FounderDecision[] = [
  {
    id: "SCI-OWNER",
    question: "Assign the accountable scientific validation owner before biological gates advance.",
    whyNow: "The PMO marks scientific ownership as TBD and explicitly requires an accountable owner before G2/G3/G4 biological advancement.",
    recommendation: "Resolve the owner dependency; do not substitute more software or governance work.",
    evidence: {
      source: "PMO CURRENT_STATE.md — Biological validation rule",
      authority: "Crabionics PMO",
      status: "KNOWN",
    },
    actionLabel: "Open PMO state",
    actionHref: "https://github.com/Crabionics/crabionics-pmo/blob/main/00_Governance/PMO/CURRENT_STATE.md",
  },
  {
    id: "BIRAC-M0",
    question: "Establish primary evidence for the BIRAC M0 release before treating the ₹20L as received.",
    whyNow: "The agreement is executed, but the PMO explicitly says actual receipt is not evidenced.",
    recommendation: "Request/reconcile bank receipt and supporting primary records; keep the funding status unevidenced until then.",
    evidence: {
      source: "PMO CURRENT_STATE.md — Funding boundary",
      authority: "Crabionics PMO",
      status: "UNKNOWN",
    },
    actionLabel: "Open funding state",
    actionHref: "https://github.com/Crabionics/crabionics-pmo/blob/main/00_Governance/PMO/CURRENT_STATE.md",
  },
];

export const founderActions = [
  {
    title: "Advance physical validation",
    why: "The execution spine is procurement → AquaOS truth → lab start → first technical data.",
    evidence: "PMO CURRENT_STATE.md / Critical Path",
    href: "https://github.com/Crabionics/crabionics-pmo/blob/main/00_Governance/PMO/CRITICAL_PATH_2026-08-22.md",
  },
  {
    title: "Protect the biological evidence boundary",
    why: "Technical closed-loop validation is explicitly separate from biological validation.",
    evidence: "PMO CURRENT_STATE.md / Phase 2 gate boundary",
    href: "https://github.com/Crabionics/crabionics-pmo/blob/main/00_Governance/PMO/CURRENT_STATE.md",
  },
  {
    title: "Continue processor validation in parallel",
    why: "Commercial validation is a separate downstream company track and must not wait for software polish.",
    evidence: "PMO #39",
    href: "https://github.com/Crabionics/crabionics-pmo/issues/39",
  },
];
