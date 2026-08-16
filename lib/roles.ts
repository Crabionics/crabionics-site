export type Role = "admin" | "mentor" | "investor" | "team";

export interface Permissions {
  currentGate: boolean;
  blockers: boolean;
  evidenceProven: boolean;
  evidenceValidating: boolean;
  evidenceUnknown: boolean;
  commercial: boolean;
  capital: boolean;
  technical: boolean;
  rawPmoLinks: boolean;
  financialDetail: boolean;
}

const DENY_ALL: Permissions = {
  currentGate: false,
  blockers: false,
  evidenceProven: false,
  evidenceValidating: false,
  evidenceUnknown: false,
  commercial: false,
  capital: false,
  technical: false,
  rawPmoLinks: false,
  financialDetail: false,
};

const PERMISSIONS: Record<Role, Permissions> = {
  admin: {
    currentGate: true,
    blockers: true,
    evidenceProven: true,
    evidenceValidating: true,
    evidenceUnknown: true,
    commercial: true,
    capital: true,
    technical: true,
    rawPmoLinks: true,
    financialDetail: true,
  },
  mentor: {
    currentGate: true,
    blockers: true,
    evidenceProven: true,
    evidenceValidating: true,
    evidenceUnknown: true,
    commercial: true,
    capital: true,
    technical: true,
    rawPmoLinks: false,
    financialDetail: false,
  },
  investor: {
    currentGate: true,
    blockers: false,
    evidenceProven: true,
    evidenceValidating: true,
    evidenceUnknown: false,
    commercial: true,
    capital: true,
    technical: false,
    rawPmoLinks: false,
    financialDetail: false,
  },
  team: {
    currentGate: true,
    blockers: true,
    evidenceProven: true,
    evidenceValidating: true,
    evidenceUnknown: false,
    commercial: false,
    capital: false,
    technical: true,
    rawPmoLinks: true,
    financialDetail: false,
  },
};

export function getPermissions(role: Role | undefined | null): Permissions {
  return role && role in PERMISSIONS ? PERMISSIONS[role] : DENY_ALL;
}

export function isRole(value: unknown): value is Role {
  return value === "admin" || value === "mentor" || value === "investor" || value === "team";
}
