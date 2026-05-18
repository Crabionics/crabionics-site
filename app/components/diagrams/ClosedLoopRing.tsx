type Node = {
  id: string;
  angle: number; // degrees, 0 = right, 90 = top, etc.
  title: string;
  sub: string;
};

const nodes: Node[] = [
  { id: "sensor",   angle:  90, title: "Sensor",   sub: "Capture telemetry"  },
  { id: "state",    angle:   0, title: "State",    sub: "Biological signal"   },
  { id: "decision", angle: 270, title: "Decision", sub: "Compute response"    },
  { id: "action",   angle: 180, title: "Action",   sub: "Actuate system"      },
];

// Wider viewBox (1040 × 720) so side-node labels never clip on desktop
const VB_W = 1040;
const VB_H = 720;
const CX = VB_W / 2;   // 520
const CY = VB_H / 2;   // 360
const R_RING = 240;
const R_ORBIT = 195;
const NODE_R = 46;

function pos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * r,
    y: CY - Math.sin(rad) * r,
  };
}

export default function ClosedLoopRing() {
  return (
    <>
      {/* ── sm+ : animated SVG ring — labels fully visible ── */}
      <div className="hidden sm:block relative mx-auto w-full max-w-[900px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Closed-loop operating system: Sensor, State, Decision, Action — each cycle teaches the next."
        >
          <defs>
            <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="rgba(34,211,238,0.55)" />
              <stop offset="100%" stopColor="rgba(20,184,166,0.40)" />
            </linearGradient>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(34,211,238,0.18)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </radialGradient>
            <radialGradient id="nodeFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(5,8,22,0.9)" />
              <stop offset="100%" stopColor="rgba(5,8,22,0.6)" />
            </radialGradient>
            <radialGradient id="hubFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(34,211,238,0.40)" />
              <stop offset="60%"  stopColor="rgba(20,184,166,0.15)" />
              <stop offset="100%" stopColor="rgba(20,184,166,0)" />
            </radialGradient>
          </defs>

          {/* Background glow */}
          <circle cx={CX} cy={CY} r={R_RING + 120} fill="url(#ringGlow)" />

          {/* Outer ring */}
          <circle cx={CX} cy={CY} r={R_RING} fill="none" stroke="url(#ringStroke)" strokeWidth="1.6" />

          {/* Inner dashed orbit — slowly rotating */}
          <g style={{ animation: "crab-loop-rotate 60s linear infinite", transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r={R_ORBIT} fill="none" stroke="rgba(103,232,249,0.40)" strokeWidth="1.2" strokeDasharray="2 12" />
          </g>

          {/* Counter-rotating outer trim */}
          <g style={{ animation: "crab-loop-rotate-rev 120s linear infinite", transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r={R_RING + 18} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1" strokeDasharray="3 18" />
          </g>

          {/* Hub */}
          <circle cx={CX} cy={CY} r="110" fill="url(#hubFill)" />
          <circle cx={CX} cy={CY} r="78" fill="rgba(5,8,22,0.75)" stroke="rgba(103,232,249,0.45)" strokeWidth="1.2" />
          <text x={CX} y={CY - 6}  textAnchor="middle" fontFamily="var(--font-display), serif" fontSize="26" fill="#f8fafc">Closed</text>
          <text x={CX} y={CY + 24} textAnchor="middle" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="26" fill="#67e8f9">loop</text>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const p = pos(node.angle, R_RING);
            const labelOnRight  = p.x > CX;
            const labelDx       = labelOnRight ? NODE_R + 18 : -(NODE_R + 18);
            const anchor        = labelOnRight ? "start" : "end";
            const isTop         = node.angle === 90;
            const isBottom      = node.angle === 270;
            const useStacked    = isTop || isBottom;
            const stackedDy     = isTop ? -(NODE_R + 22) : NODE_R + 30;

            return (
              <g key={node.id}>
                {/* Pulse ring */}
                <circle
                  cx={p.x} cy={p.y} r={NODE_R + 6}
                  fill="none" stroke="rgba(103,232,249,0.5)" strokeWidth="1"
                  style={{
                    transformOrigin: `${p.x}px ${p.y}px`,
                    animation: `crab-loop-pulse 4.8s ease-out infinite`,
                    animationDelay: `${i * 1.2}s`,
                    opacity: 0,
                  }}
                />
                {/* Node body */}
                <circle cx={p.x} cy={p.y} r={NODE_R} fill="url(#nodeFill)" stroke="rgba(103,232,249,0.55)" strokeWidth="1.3" />
                <circle cx={p.x} cy={p.y} r="6" fill="#67e8f9" />

                {/* Label */}
                {useStacked ? (
                  <g>
                    <text x={p.x} y={p.y + stackedDy}      textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="600" fill="#f8fafc">{node.title}</text>
                    <text x={p.x} y={p.y + stackedDy + 23} textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="13" letterSpacing="2"  fill="#67e8f9" opacity="0.85">{node.sub.toUpperCase()}</text>
                  </g>
                ) : (
                  <g>
                    <text x={p.x + labelDx} y={p.y - 4}  textAnchor={anchor} fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="600" fill="#f8fafc">{node.title}</text>
                    <text x={p.x + labelDx} y={p.y + 18} textAnchor={anchor} fontFamily="Inter, system-ui, sans-serif" fontSize="13" letterSpacing="2"  fill="#67e8f9" opacity="0.85">{node.sub.toUpperCase()}</text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Direction arrows on the ring, between nodes */}
          {[45, 315, 225, 135].map((a) => {
            const p = pos(a, R_RING);
            const tangentRad = ((a - 90) * Math.PI) / 180;
            const dx = Math.cos(tangentRad);
            const dy = -Math.sin(tangentRad);
            const size = 7;
            const tipX   = p.x + dx * size;
            const tipY   = p.y + dy * size;
            const baseLX = p.x - dx * size * 0.6 - dy * size * 0.6;
            const baseLY = p.y - dy * size * 0.6 + dx * size * 0.6;
            const baseRX = p.x - dx * size * 0.6 + dy * size * 0.6;
            const baseRY = p.y - dy * size * 0.6 - dx * size * 0.6;
            return (
              <polygon key={a} points={`${tipX},${tipY} ${baseLX},${baseLY} ${baseRX},${baseRY}`} fill="rgba(103,232,249,0.7)" />
            );
          })}
        </svg>

        <style>{`
          @keyframes crab-loop-rotate     { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
          @keyframes crab-loop-rotate-rev { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
          @keyframes crab-loop-pulse      { 0%   { transform: scale(1);    opacity: 0.6; }
                                            70%  { transform: scale(1.45); opacity: 0;   }
                                            100% { transform: scale(1.45); opacity: 0;   } }
        `}</style>
      </div>

      {/* ── mobile : readable 2 × 2 card grid ── */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          {nodes.map((node, i) => (
            <div key={node.id} className="rounded-2xl border border-cyan-400/25 bg-white/5 p-5 text-center">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-300 mb-3">
                {i + 1}
              </span>
              <p className="text-base font-semibold text-white">{node.title}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cyan-400/75">{node.sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-slate-400">Each cycle feeds the next.</p>
      </div>
    </>
  );
}
