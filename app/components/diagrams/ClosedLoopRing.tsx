type Node = {
  id: string;
  angle: number; // degrees, 0 = right, 90 = top, etc.
  title: string;
  sub: string;
};

/**
 * Signature visual: a single circular loop that names the four operating
 * stages of the system. Subtle continuous motion via a slowly rotating
 * dashed inner orbit; nodes pulse on a staggered cadence.
 */
const nodes: Node[] = [
  { id: "sensor",   angle:  90, title: "Sensor",   sub: "Capture telemetry"        },
  { id: "state",    angle:   0, title: "State",    sub: "Infer biological signal"  },
  { id: "decision", angle: 270, title: "Decision", sub: "Compute response"         },
  { id: "action",   angle: 180, title: "Action",   sub: "Execute infrastructure"   },
];

const VB = 720;          // viewBox is VB × VB
const CX = VB / 2;
const CY = VB / 2;
const R_RING = 250;      // main ring radius (where the nodes sit)
const R_ORBIT = 200;     // inner rotating dashed orbit
const NODE_R = 46;

function pos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * r,
    y: CY - Math.sin(rad) * r, // SVG y is inverted
  };
}

export default function ClosedLoopRing() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VB} ${VB}`}
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
        <circle
          cx={CX}
          cy={CY}
          r={R_RING}
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="1.6"
        />

        {/* Inner dashed orbit — slowly rotating, gives the loop a sense of motion */}
        <g style={{ animation: "crab-loop-rotate 60s linear infinite", transformOrigin: `${CX}px ${CY}px` }}>
          <circle
            cx={CX}
            cy={CY}
            r={R_ORBIT}
            fill="none"
            stroke="rgba(103,232,249,0.40)"
            strokeWidth="1.2"
            strokeDasharray="2 12"
          />
        </g>

        {/* Counter-rotating outer trim */}
        <g style={{ animation: "crab-loop-rotate-rev 120s linear infinite", transformOrigin: `${CX}px ${CY}px` }}>
          <circle
            cx={CX}
            cy={CY}
            r={R_RING + 18}
            fill="none"
            stroke="rgba(148,163,184,0.18)"
            strokeWidth="1"
            strokeDasharray="3 18"
          />
        </g>

        {/* Hub */}
        <circle cx={CX} cy={CY} r="110" fill="url(#hubFill)" />
        <circle
          cx={CX}
          cy={CY}
          r="78"
          fill="rgba(5,8,22,0.75)"
          stroke="rgba(103,232,249,0.45)"
          strokeWidth="1.2"
        />
        <text
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          fontFamily="var(--font-display), serif"
          fontSize="26"
          fill="#f8fafc"
        >
          Closed
        </text>
        <text
          x={CX}
          y={CY + 24}
          textAnchor="middle"
          fontFamily="var(--font-display), serif"
          fontStyle="italic"
          fontSize="26"
          fill="#67e8f9"
        >
          loop
        </text>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const p = pos(node.angle, R_RING);
          const labelOnRight = p.x >= CX;
          const labelDx = labelOnRight ? NODE_R + 14 : -(NODE_R + 14);
          const anchor = labelOnRight ? "start" : "end";
          const isTop = node.angle === 90;
          const isBottom = node.angle === 270;

          // For top/bottom nodes, stack the label below/above instead of beside
          const useStackedLabel = isTop || isBottom;
          const stackedDy = isTop ? -(NODE_R + 22) : NODE_R + 30;

          return (
            <g key={node.id}>
              {/* Pulse ring */}
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R + 6}
                fill="none"
                stroke="rgba(103,232,249,0.5)"
                strokeWidth="1"
                style={{
                  transformOrigin: `${p.x}px ${p.y}px`,
                  animation: `crab-loop-pulse 4.8s ease-out infinite`,
                  animationDelay: `${i * 1.2}s`,
                  opacity: 0,
                }}
              />

              {/* Node body */}
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill="url(#nodeFill)"
                stroke="rgba(103,232,249,0.55)"
                strokeWidth="1.3"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#67e8f9"
              />

              {/* Label */}
              {useStackedLabel ? (
                <g>
                  <text
                    x={p.x}
                    y={p.y + stackedDy}
                    textAnchor="middle"
                    fontFamily="Inter, system-ui, sans-serif"
                    fontSize="18"
                    fontWeight="600"
                    fill="#f8fafc"
                  >
                    {node.title}
                  </text>
                  <text
                    x={p.x}
                    y={p.y + stackedDy + 20}
                    textAnchor="middle"
                    fontFamily="Inter, system-ui, sans-serif"
                    fontSize="12"
                    letterSpacing="2"
                    fill="#67e8f9"
                    opacity="0.85"
                  >
                    {node.sub.toUpperCase()}
                  </text>
                </g>
              ) : (
                <g>
                  <text
                    x={p.x + labelDx}
                    y={p.y - 4}
                    textAnchor={anchor}
                    fontFamily="Inter, system-ui, sans-serif"
                    fontSize="18"
                    fontWeight="600"
                    fill="#f8fafc"
                  >
                    {node.title}
                  </text>
                  <text
                    x={p.x + labelDx}
                    y={p.y + 16}
                    textAnchor={anchor}
                    fontFamily="Inter, system-ui, sans-serif"
                    fontSize="12"
                    letterSpacing="2"
                    fill="#67e8f9"
                    opacity="0.85"
                  >
                    {node.sub.toUpperCase()}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Tiny direction arrows on the ring, between nodes */}
        {[45, 315, 225, 135].map((a) => {
          const p = pos(a, R_RING);
          // arrow points clockwise (which on SVG is the direction Sensor → State → Decision → Action)
          // Tangent direction at this angle (clockwise) is angle - 90 (math), so SVG (-sin, -cos) etc.
          const tangentRad = ((a - 90) * Math.PI) / 180;
          const dx = Math.cos(tangentRad);
          const dy = -Math.sin(tangentRad);
          const size = 7;
          // Build a small triangle pointing in (dx, dy)
          const tipX = p.x + dx * size;
          const tipY = p.y + dy * size;
          const baseLX = p.x - dx * size * 0.6 - dy * size * 0.6;
          const baseLY = p.y - dy * size * 0.6 + dx * size * 0.6;
          const baseRX = p.x - dx * size * 0.6 + dy * size * 0.6;
          const baseRY = p.y - dy * size * 0.6 - dx * size * 0.6;
          return (
            <polygon
              key={a}
              points={`${tipX},${tipY} ${baseLX},${baseLY} ${baseRX},${baseRY}`}
              fill="rgba(103,232,249,0.7)"
            />
          );
        })}
      </svg>

      {/* Inline keyframes — scoped names */}
      <style>{`
        @keyframes crab-loop-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes crab-loop-rotate-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes crab-loop-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.45); opacity: 0;   }
          100% { transform: scale(1.45); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
