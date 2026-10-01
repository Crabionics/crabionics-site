"use client";

import { useMemo, useState } from "react";

type Status = "Implemented" | "Integrated" | "Pending" | "Validated" | "Proposed" | "Commercial evidence gap";
type Tone = "good" | "warn" | "risk" | "neutral";

type Node = {
  id: string;
  name: string;
  role: string;
  status: Status;
  tone: Tone;
  source: string;
  owner: string;
  implementation: string;
  evidence: string;
};

const nodes: Node[] = [
  { id: "habitat", name: "Habitat", role: "Physical production environment", status: "Pending", tone: "warn", source: "Habitat README / PMO current state", owner: "Physical engineering", implementation: "Engineering baseline exists; integrated identity/runtime remains pending.", evidence: "Engineering baseline only; physical validation evidence not established." },
  { id: "sense", name: "CrabSense", role: "Sensor identity, calibration and canonical telemetry", status: "Integrated", tone: "warn", source: "CrabSense README / v0.1 contract", owner: "Instrumentation", implementation: "Canonical telemetry interface merged; calibration and physical integration pending.", evidence: "Software contract evidence only; no calibration/field evidence." },
  { id: "pod", name: "CrabPod", role: "Edge acquisition and actuator execution", status: "Integrated", tone: "warn", source: "CrabPod README / PMO integration contract", owner: "Edge/control engineering", implementation: "Firmware foundation and QoS1 transport/replay merged; physical runtime pending.", evidence: "Synthetic/runtime implementation evidence; physical actuator proof pending." },
  { id: "aquaos", name: "AquaOS", role: "State, decision, command and evidence layer", status: "Integrated", tone: "good", source: "AquaOS develop / PMO AOS-011", owner: "Software / control", implementation: "Lifecycle, telemetry, rules, alerts, command/ack and synthetic closed-loop path implemented on develop.", evidence: "CI + synthetic real-stack evidence; not physical or biological validation." },
  { id: "biopod", name: "BioPod", role: "Biological observation and outcome layer", status: "Pending", tone: "risk", source: "AquaOS biological-engine docs / PMO", owner: "Scientific validation", implementation: "Defined as the biological validation layer; scientific ownership/protocol still required.", evidence: "Biological proof not established." },
];

const production = [
  ["Seed / hatchery", "IHMS / HatchSync", "Seed intelligence and hatchery execution", "PMO strategic synthesis"],
  ["Community / farmer nursery", "Distributed biomass", "Biomass development before controlled finishing", "PMO #155 / #157"],
  ["Pond grow-out", "Farmer production network", "Distributed biomass production and measured supply baseline", "PMO G4 evidence boundary"],
  ["RAS finishing", "Crabionics controlled finishing", "Specification-driven finishing and standardized output", "PMO commercial strategy"],
  ["Processor / export / HORECA", "Market interface", "Demand, specification and commercial validation", "PMO #156 / G7"],
] as const;

const experiments = [
  ["CP-INT-001", "Temperature instrumentation", "CrabSense → CrabPod → MQTT → AquaOS", "Current technical execution anchor", "Physical evidence pending"],
  ["VAL-004A", "Basic MQTT transmission", "CrabPod telemetry → broker → AquaOS", "Integration prerequisite", "Synthetic/runtime evidence exists"],
  ["VAL-004B", "24h endurance / reconnect", "CrabPod transport resilience", "Reliability prerequisite", "Pending physical execution"],
  ["VAL-007", "Technical closed loop", "Sensor → rule → command → relay → acknowledgement/outcome", "Phase 2 target", "Not physically validated"],
  ["G3 / biological", "Controlled biological observation", "Biological state → decision → intervention → outcome", "Downstream validation", "Protocol/scientific owner required"],
] as const;

const evidence = [
  ["Governance", "PMO current state, YAML, ADRs and active blockers", "Established", "PMO"],
  ["Software implementation", "AquaOS / CrabPod / CrabSense repositories", "Implemented in relevant slices", "Owning repositories"],
  ["Synthetic integration", "Telemetry → event → decision → command → acknowledgement path", "Observed in synthetic/runtime environment", "AquaOS / PMO"],
  ["Physical integration", "Actual sensor + edge + actuator loop", "Not yet proven", "Runtime/raw evidence"],
  ["Biological validation", "Measured crab response under defined protocol", "Not yet proven", "Scientific evidence"],
  ["Commercial validation", "Buyer demand + farmer baseline + repeatable economics", "Evidence gap", "Commercial experiments"],
] as const;

const claims = [
  ["KNOWN", "Implementation exists", "Software implementation is not equivalent to physical or biological validation.", "good"],
  ["OBSERVED", "Synthetic closed loop", "Runtime/synthetic evidence demonstrates the software path; it does not establish field performance.", "good"],
  ["NEEDS EXPERIMENT", "Physical loop", "The first temperature experiment must establish real instrumentation/control evidence.", "warn"],
  ["UNKNOWN", "Biological outcome", "No biological claim should be promoted without controlled measured evidence.", "risk"],
  ["PROPOSED", "Commercial architecture", "Distributed biomass → controlled finishing → standardized output is the current strategic model, not achieved scale.", "warn"],
] as const;

function Badge({ children, tone }: { children: React.ReactNode; tone: Tone }) {
  const cls = tone === "good" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : tone === "warn" ? "border-amber-200 bg-amber-50 text-amber-700" : tone === "risk" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-slate-50 text-slate-600";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${cls}`}>{children}</span>;
}

function toneFor(status: Status): Tone {
  if (status === "Integrated" || status === "Implemented" || status === "Validated") return "good";
  if (status === "Pending" || status === "Proposed") return "warn";
  return "risk";
}

export default function DigitalModelPage() {
  const [tab, setTab] = useState("overview");
  const [selected, setSelected] = useState("aquaos");
  const selectedNode = useMemo(() => nodes.find((n) => n.id === selected) ?? nodes[3], [selected]);

  const tabs = [
    ["overview", "System map"],
    ["systems", "Subsystem truth"],
    ["experiments", "Experiments"],
    ["evidence", "Evidence"],
    ["commercial", "Commercial"],
  ] as const;

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <section className="bg-[#0b2347] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Crabionics · Cloud Prototype</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Digital System Explorer</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A repository-grounded projection of the Crabionics production, sensing, control, evidence and commercial architecture. This is not a Digital Twin and does not turn proposed or synthetic states into field claims.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-slate-400">Prototype rule</p>
              <p className="mt-1 font-semibold">PMO → repositories → runtime evidence</p>
              <p className="mt-2 text-xs text-slate-400">Implementation ≠ validation ≠ commercial proof</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 lg:px-10">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`border-b-2 px-4 py-4 text-sm font-semibold whitespace-nowrap ${tab === id ? "border-cyan-600 text-[#0b2347]" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {tab === "overview" && (
          <div className="space-y-8">
            <section className="grid gap-4 md:grid-cols-5">
              {nodes.map((n) => (
                <button key={n.id} onClick={() => { setSelected(n.id); setTab("systems"); }} className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selected === n.id ? "border-cyan-400 ring-2 ring-cyan-100" : "border-slate-200"}`}>
                  <div className="flex items-start justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{n.role}</span><Badge tone={n.tone}>{n.status}</Badge></div>
                  <h2 className="mt-4 text-xl font-semibold text-[#0b2347]">{n.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{n.implementation}</p>
                </button>
              ))}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="flex flex-col gap-2"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Governing execution loop</p><h2 className="text-2xl font-semibold text-[#0b2347]">Physical system → observation → decision → intervention → outcome → evidence</h2></div>
              <div className="mt-8 grid gap-3 md:grid-cols-7">
                {["Habitat", "CrabSense", "CrabPod", "MQTT", "AquaOS", "Command / Ack", "Evidence"].map((x, i) => <div key={x} className="flex items-center gap-2"><div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"><p className="text-sm font-semibold text-[#0b2347]">{x}</p><p className="mt-1 text-[11px] text-slate-500">{i < 3 ? "physical / edge" : i === 3 ? "transport" : i < 6 ? "software" : "proof"}</p></div>{i < 6 && <span className="hidden text-slate-300 md:block">→</span>}</div>)}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Current execution spine</p>
                <div className="mt-5 space-y-3">{["Procurement / lab readiness", "AquaOS truth + integration", "CP-INT-001 physical instrumentation", "First real technical data", "VAL-007 technical closed loop", "Biological validation", "600-box / commercial evidence"].map((x, i) => <div key={x} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0b2347] text-xs font-semibold text-white">{i + 1}</span><span className="text-sm font-medium text-slate-700">{x}</span></div>)}</div>
              </div>
              <div className="rounded-3xl bg-[#0b2347] p-6 text-white shadow-sm lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Prototype boundary</p>
                <h2 className="mt-4 text-2xl font-semibold">What this page does not claim</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300"><li>• No physical sensor runtime is implied.</li><li>• No biological performance is implied.</li><li>• No 600-box result is implied.</li><li>• No processor-funded deployment is implied.</li><li>• Synthetic data is visibly treated as synthetic.</li></ul>
              </div>
            </section>
          </div>
        )}

        {tab === "systems" && (
          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-3">{nodes.map((n) => <button key={n.id} onClick={() => setSelected(n.id)} className={`w-full rounded-2xl border p-5 text-left ${selected === n.id ? "border-cyan-400 bg-cyan-50/50" : "border-slate-200 bg-white"}`}><div className="flex items-center justify-between gap-3"><span className="font-semibold text-[#0b2347]">{n.name}</span><Badge tone={n.tone}>{n.status}</Badge></div><p className="mt-2 text-xs text-slate-500">{n.role}</p></button>)}</div>
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Subsystem truth</p>
              <div className="mt-3 flex items-center justify-between gap-4"><h2 className="text-3xl font-semibold text-[#0b2347]">{selectedNode.name}</h2><Badge tone={selectedNode.tone}>{selectedNode.status}</Badge></div>
              <p className="mt-3 text-slate-600">{selectedNode.role}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2"><Info label="Owner" value={selectedNode.owner}/><Info label="Source" value={selectedNode.source}/><Info label="Implementation" value={selectedNode.implementation}/><Info label="Evidence boundary" value={selectedNode.evidence}/></div>
              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900"><strong>Reconciliation rule:</strong> architecture/documentation describes intent; implementation establishes software state; runtime/raw evidence establishes operational proof.</div>
            </div>
          </section>
        )}

        {tab === "experiments" && (
          <section className="space-y-6">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Validation execution</p><h2 className="mt-2 text-3xl font-semibold text-[#0b2347]">Experiments are the bridge from architecture to evidence</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">The prototype exposes the current experiment spine without claiming that pending physical work has already happened.</p></div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="hidden grid-cols-[1fr_1.2fr_1.5fr_1.2fr_1fr] gap-4 border-b bg-slate-50 p-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 md:grid"><span>Experiment</span><span>Question</span><span>System path</span><span>Purpose</span><span>Evidence</span></div>{experiments.map((e) => <div key={e[0]} className="grid gap-2 border-b border-slate-100 p-5 md:grid-cols-[1fr_1.2fr_1.5fr_1.2fr_1fr] md:gap-4"><span className="font-semibold text-[#0b2347]">{e[0]}</span><span className="text-sm text-slate-700">{e[1]}</span><span className="text-sm text-slate-600">{e[2]}</span><span className="text-sm text-slate-600">{e[3]}</span><Badge tone={e[4].includes("pending") || e[4].includes("required") || e[4].includes("Not") ? "warn" : "good"}>{e[4]}</Badge></div>)}</div>
          </section>
        )}

        {tab === "evidence" && (
          <section className="space-y-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Evidence control</p><h2 className="mt-2 text-3xl font-semibold text-[#0b2347]">Claim → implementation → experiment → raw evidence → verdict</h2></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{evidence.map((e) => <div key={e[0]} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-[#0b2347]">{e[0]}</h3><Badge tone={e[2] === "Established" || e[2].includes("Implemented") ? "good" : e[2].includes("gap") || e[2].includes("Not") ? "risk" : "warn"}>{e[2]}</Badge></div><p className="mt-4 text-sm leading-6 text-slate-600">{e[1]}</p><p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">{e[3]}</p></div>)}</div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{claims.map((c) => <div key={c[0]} className="rounded-2xl border border-slate-200 bg-white p-5"><Badge tone={c[3] as Tone}>{c[0]}</Badge><h3 className="mt-4 font-semibold text-[#0b2347]">{c[1]}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{c[2]}</p></div>)}</div>
          </section>
        )}

        {tab === "commercial" && (
          <section className="space-y-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Commercial architecture</p><h2 className="mt-2 text-3xl font-semibold text-[#0b2347]">Distributed biomass → controlled finishing → standardized output</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">This is the current strategic architecture. The prototype deliberately labels the downstream stages as hypotheses or evidence gates where the PMO has not established proof.</p></div>
            <div className="grid gap-3 md:grid-cols-5">{production.map((p, i) => <div key={p[0]} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="text-xs font-semibold text-cyan-700">0{i + 1}</span><h3 className="mt-3 font-semibold text-[#0b2347]">{p[0]}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">{p[1]}</p><p className="mt-3 text-sm leading-6 text-slate-600">{p[2]}</p><p className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-400">{p[3]}</p>{i < production.length - 1 && <span className="absolute -right-3 top-1/2 z-10 hidden text-slate-300 md:block">→</span>}</div>)}</div>
            <div className="grid gap-6 lg:grid-cols-3"><InfoCard title="G4 · Pond supply wedge" text="Requires a defined farmer baseline and measured size, survival, growth, cycle and harvest biomass evidence." tone="warn"/><InfoCard title="G7 · Processor/customer validation" text="Buyer discovery is active evidence work; lead status is not equivalent to validated demand or a committed payer." tone="warn"/><InfoCard title="G6/G8 · Scale" text="600-box and 3,000-box configurations are validation/deployment targets, not achieved production results." tone="risk"/></div>
          </section>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-6 text-xs leading-6 text-slate-500">
          Prototype source boundary: PMO current state + machine-readable state + owning product repositories + runtime/evidence rules. Built as a cloud prototype on the existing Crabionics site; no physical or biological validation claim is created by this UI.
        </footer>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p><p className="mt-2 text-sm leading-6 text-slate-700">{value}</p></div>;
}

function InfoCard({ title, text, tone }: { title: string; text: string; tone: Tone }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><Badge tone={tone}>{tone === "risk" ? "NOT CLEARED" : "EVIDENCE REQUIRED"}</Badge><h3 className="mt-4 text-lg font-semibold text-[#0b2347]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>;
}
