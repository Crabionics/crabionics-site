import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { filterStateForRole, getControlTowerState } from "@/lib/github";
import { isRole, type Role } from "@/lib/roles";

export async function GET() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const metadataRole = user.publicMetadata.role;
  const role: Role | undefined = isRole(metadataRole) ? metadataRole : undefined;

  if (!role) {
    return NextResponse.json({ error: "Role not assigned" }, { status: 403 });
  }

  try {
    const state = await getControlTowerState();
    return NextResponse.json({ role, ...filterStateForRole(state, role) });
  } catch {
    return NextResponse.json({ error: "PMO fetch failed" }, { status: 502 });
  }
}
