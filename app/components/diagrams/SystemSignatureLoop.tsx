const sequence = [
  { label: "Habitat", number: "01", tone: "standard" },
  { label: "CrabSense / observation", number: "02", tone: "standard" },
  { label: "AquaOS / decision support", number: "03", tone: "standard" },
  { label: "Operator", number: "", tone: "boundary" },
  { label: "CrabPod / intervention", number: "04", tone: "standard" },
  { label: "Outcome", number: "05", tone: "standard" },
  { label: "Learning", number: "06", tone: "standard" },
] as const;

function SequenceNode({ label, number, tone }: (typeof sequence)[number]) {
  const boundary = tone === "boundary";
  return (
    <div className={`relative z-10 flex min-h-[78px] flex-1 flex-col justify-between border p-3 text-white backdrop-blur-sm sm:p-4 ${boundary ? "border-[var(--public-ocean-cyan)] bg-[var(--public-ocean-cyan)]/20 shadow-[0_0_0_1px_var(--public-ocean-cyan)]" : "border-[var(--public-ocean-cyan)]/60 bg-white/[0.08]"}`}>
      <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${boundary ? "text-white" : "text-[var(--public-ice)]"}`}>{number || (boundary ? "Boundary" : "\u00a0")}</span>
      <span className="text-sm font-semibold leading-5 tracking-[-0.01em] sm:text-base">{label}</span>
    </div>
  );
}

export default function SystemSignatureLoop() {
  return (
    <div className="system-signature-loop relative" aria-label="Habitat to learning operating sequence">
      <div className="pointer-events-none absolute inset-3 hidden border border-[var(--public-ocean-cyan)]/30 lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[220px] w-[78%] -translate-x-1/2 -translate-y-1/2 border-y border-dashed border-[var(--public-ocean-cyan)]/35 lg:block" />
      <div className="relative z-10 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-1">
        {sequence.map((step, index) => (
          <div key={step.label} className="contents">
            <SequenceNode {...step} />
            {index < sequence.length - 1 && (
            <span className="flex h-6 shrink-0 items-center justify-center text-lg font-semibold text-[var(--public-ocean-cyan)] lg:h-auto lg:w-4" aria-hidden>
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
