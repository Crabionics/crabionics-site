import type { Metadata } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getControlTowerState, filterStateForRole } from "@/lib/github";
import { getPermissions, isRole, type Role } from "@/lib/roles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control Tower",
  description: "Private CEO, mentor, investor and team view of Crabionics company state.",
  robots: { index: false, follow: false },
};

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "risk" }) {
  const styles = {
    neutral: "border-white/10 bg-white/5 text-slate-300",
    good: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    warn: "border-amber-400/25 bg-amber-400/10 text-amber-200",
    risk: "border-red-400/25 bg-red-400/10 text-red-200",
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${styles[tone]}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur ${className}`}>{children}</section>;
}

function stateTone(value: string) {
  if (/proven|verified|cleared/i.test(value)) return "good" as const;
  if (/validation|pending|partial|hypothesis/i.test(value)) return "warn" as const;
  if (/not proven|blocked/i.test(value)) return "risk" as const;
  return "neutral" as const;
}

export default async function ControlTowerPage() {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) return null;

  const user = await (await clerkClient()).users.getUser(userId);
  const metadataRole = user.publicMetadata.role;
  const role: Role | undefined = isRole(metadataRole) ? metadataRole : undefined;

  if (!role) {
    return (
      <main className="relative min-h-screen px-5 pb-20 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8">
          <Badge tone="warn">AUTHENTICATED · ROLE REQUIRED</Badge>
          <h1 className="mt-4 text-3xl font-semibold text-white">Control Tower access is not assigned yet.</h1>
          <p className="mt-3 leading-7 text-slate-300">Ask a Crabionics admin to assign one of: admin, mentor, investor, team.</p>
        </div>
      </main>
    );
  }

  const permissions = getPermissions(role);
  const rawState = await getControlTowerState();
  const state = filterStateForRole(rawState, role);
  const currentGate = state.pmoIssues.some((issue) => /AOS-011/i.test(issue.title)) ? "AOS-011" : "AOS-008 → AOS-011";
  const latestIssues = state.pmoIssues.slice(0, 8);

  return (
    <main className="relative min-h-screen px-5 pb-20 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-7">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone={state.live ? "good" : "warn"}>{state.live ? "LIVE · PMO/GITHUB" : "DEGRADED · FALLBACK"}</Badge>
              <Badge>{role.toUpperCase()} VIEW</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Crabionics Control Tower</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">The private company-state layer above the PMO: what exists, what is being validated, what is not proven, and what evidence unlocks the next stage.</p>
          </div>
          <Card className="lg:min-w-64">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Authority</div>
            <div className="mt-2 font-medium text-white">PMO → owning repositories</div>
            <div className="mt-1 text-xs text-slate-500">Last read: {new Date(state.lastUpdated).toLocaleString("en-IN")}</div>
          </Card>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {permissions.currentGate && <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Current gate</div><div className="mt-3 text-2xl font-semibold text-white">{currentGate}</div><div className="mt-2 text-sm text-slate-300">Alert → Decision → Action integration evidence</div></Card>}
          <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Next irreversible milestone</div><div className="mt-3 text-2xl font-semibold text-white">600-box validation</div><div className="mt-2 text-sm text-slate-300">Biology + technology + economics + demand</div></Card>
          {permissions.capital && <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Capital principle</div><div className="mt-3 text-2xl font-semibold text-white">Evidence first</div><div className="mt-2 text-sm text-slate-300">Institutional targets remain parked until their evidence stage is earned.</div></Card>}
          {permissions.blockers && <Card><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Explicit blockers</div><div className="mt-3 text-2xl font-semibold text-white">{state.blockers.length || "—"}</div><div className="mt-2 text-sm text-slate-300">Only governed labels count as blockers.</div></Card>}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Company progression</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">Field learning → infrastructure → intelligence</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[["01", "Field learning", "PROVEN"], ["02", "Controlled infrastructure", "PROVEN"], ["03", "Telemetry + events", "IN VALIDATION"], ["04", "State + decisions", "IN VALIDATION"], ["05", "Network intelligence", "NOT PROVEN"]].map(([n, title, status]) => <div key={n} className="rounded-xl border border-white/8 bg-black/10 p-4"><div className="text-xs text-slate-500">{n}</div><div className="mt-2 font-medium text-white">{title}</div><div className="mt-3"><Badge tone={stateTone(status)}>{status}</Badge></div></div>)}
            </div>
          </Card>

          {permissions.commercial && <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Commercial convergence</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">600-box pilot</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Commercial validation requires independent evidence across all four gates.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Biology", "Technology", "Economics", "Commercial demand"].map((gate) => <div key={gate} className="rounded-xl border border-white/8 bg-black/10 p-3"><div className="text-sm font-medium text-white">{gate}</div><div className="mt-2"><Badge tone="warn">PENDING EVIDENCE</Badge></div></div>)}
            </div>
            <div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/5 p-3 text-sm text-amber-100">4/4 clears the commercial validation gate. 3/4 remains partial validation.</div>
          </Card>}
        </section>

        {(permissions.evidenceProven || permissions.evidenceValidating || permissions.evidenceUnknown) && <Card>
          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Evidence discipline</div>
          <h2 className="mt-2 text-2xl font-semibold text-white">What we know vs what we are testing</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {permissions.evidenceProven && <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4"><Badge tone="good">PROVEN / VERIFIED</Badge><p className="mt-3 text-sm leading-6 text-slate-200">Controlled production learning and the governed engineering baseline.</p></div>}
            {permissions.evidenceValidating && <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-4"><Badge tone="warn">IN VALIDATION</Badge><p className="mt-3 text-sm leading-6 text-slate-200">Runtime closed-loop integration and cross-repository identity evidence.</p></div>}
            {permissions.evidenceUnknown && <div className="rounded-xl border border-red-400/15 bg-red-400/5 p-4"><Badge tone="risk">NOT PROVEN</Badge><p className="mt-3 text-sm leading-6 text-slate-200">Repeatable commercial economics, willingness-to-pay at scale, and network moat remain hypotheses.</p></div>}
          </div>
        </Card>}

        {permissions.capital && <Card>
          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Capital follows evidence</div>
          <h2 className="mt-2 text-2xl font-semibold text-white">Capital sequence</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[["01", "Non-dilutive", "BIRAC + grants + founder resources"], ["02", "Strategic validation", "Paid PoCs / co-funded experiments"], ["03", "Commercial capital", "₹1–2 Cr after commercial evidence"], ["04", "Institutional scale", "NABVENTURES / AgriSURE later"]].map(([n, title, sub]) => <div key={n} className="rounded-xl border border-white/8 bg-black/10 p-4"><div className="text-xs text-slate-500">{n}</div><div className="mt-2 font-medium text-white">{title}</div><div className="mt-1 text-sm text-slate-400">{sub}</div></div>)}
          </div>
        </Card>}

        {permissions.technical && <Card>
          <div className="flex items-end justify-between gap-3"><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Technical view</div><h2 className="mt-2 text-2xl font-semibold text-white">Repository health</h2></div><Badge>{state.repoStatus.length} repositories</Badge></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{state.repoStatus.map((repo) => <div key={repo.repo} className="rounded-xl border border-white/8 bg-black/10 p-4"><div className="font-medium text-white">{repo.repo}</div><div className="mt-2 text-sm text-slate-400">{repo.openIssues} open issues</div></div>)}</div>
        </Card>}

        <Card>
          <div className="flex items-end justify-between gap-3"><div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Live PMO</div><h2 className="mt-2 text-2xl font-semibold text-white">Current governed work</h2></div><Badge>{latestIssues.length} shown</Badge></div>
          <div className="mt-5 space-y-3">{latestIssues.map((issue) => <a key={issue.number} href={permissions.rawPmoLinks ? issue.url : undefined} target={permissions.rawPmoLinks ? "_blank" : undefined} rel={permissions.rawPmoLinks ? "noreferrer" : undefined} className={`block rounded-xl border border-white/8 bg-black/10 p-4 ${permissions.rawPmoLinks ? "transition hover:border-cyan-300/30 hover:bg-white/[0.06]" : "cursor-default"}`}><div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><div><div className="font-medium text-white">#{issue.number} · {issue.title}</div><div className="mt-2 flex flex-wrap gap-2">{issue.labels.slice(0, 4).map((label) => <Badge key={label}>{label}</Badge>)}</div></div><span className="text-xs text-slate-500">{issue.state.toUpperCase()}</span></div></a>)}</div>
        </Card>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-5 text-xs text-slate-500"><span>Private Control Tower · role: {role}</span><span>PMO is authoritative; this view is a projection.</span></footer>
      </div>
    </main>
  );
}
