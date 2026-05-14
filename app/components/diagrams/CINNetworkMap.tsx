type Node = {
  id: string;
  label: string;
  /** Angle in degrees from positive x-axis, going counter-clockwise like math */
  angle: number;
  /** Distance from center as a fraction of max radius */
  reach: number;
  status: "live" | "pilot" | "planned";
};

/** Satellite nodes around the central CIN hub. */
const nodes: Node[] = [
  { id: "n1", label: "Pilot Site — KIIT-TBI",  angle:  20, reach: 0.95, status: "live"    },
  { id: "n2", label: "Hatchery Node",          angle:  70, reach: 0.85, status: "pilot"   },
  { id: "n3", label: "Nursery Cluster",        angle: 120, reach: 1.0,  status: "pilot"   },
  { id: "n4", label: "Soft-shell Unit",        angle: 165, reach: 0.78, status: "planned" },
  { id: "n5", label: "Grow-out Cluster A",     angle: 210, reach: 0.92, status: "planned" },
  { id: "n6", label: "Coastal Cluster B",      angle: 250, reach: 1.0,  status: "planned" },
  { id: "n7", label: "Telemetry Edge Node",    angle: 295, reach: 0.82, status: "live"    },
  { id: "n8", label: "Benchmark Partner",      angle: 335, reach: 0.96, status: "planned" },
];

const statusColor: Record<Node["status"], string> = {
  live:    "rgba(16,185,129,0.85)",
  pilot:   "rgba(103,232,249,0.85)",
  planned: "rgba(148,163,184,0.55)",
};

const statusStroke: Record<Node["status"], string> = {
  live:    "rgba(16,185,129,0.45)",
  pilot:   "rgba(103,232,249,0.55)",
  planned: "rgba(148,163,184,0.35)",
};

const WIDTH = 900;
const HEIGHT = 520;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const MAX_R = 220;

function nodePos(n: Node) {
  // SVG y-axis is inverted compared to math; flip with -sin
  const rad = (n.angle * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * MAX_R * n.reach,
    y: CY - Math.sin(rad) * MAX_R * n.reach,
  };
}

/**
 * Crustacean Intelligence Network — hub-and-satellite diagram.
 * Central CIN node connected to pilot, hatchery, nursery, grow-out, and partner nodes
 * via dashed telemetry lines. Status colors: live / pilot / planned.
 */
export default function CINNetworkMap() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Crustacean Intelligence Network: a central CIN hub connected to pilot, hatchery, nursery, grow-out, telemetry-edge, and benchmark-partner nodes by dashed telemetry lines."
    >
      <defs>
        <radialGradient id="cinHubFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(34,211,238,0.45)" />
          <stop offset="60%" stopColor="rgba(20,184,166,0.18)" />
          <stop offset="100%" stopColor="rgba(20,184,166,0.0)" />
        </radialGradient>

        <radialGradient id="cinBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(34,211,238,0.12)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </radialGradient>

        <radialGradient id="nodeFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx={CX} cy={CY} r={MAX_R + 80} fill="url(#cinBgGlow)" />

      {/* Concentric reference rings */}
      {[0.5, 0.75, 1.0].map((r) => (
        <circle
          key={r}
          cx={CX}
          cy={CY}
          r={MAX_R * r}
          fill="none"
          stroke="rgba(148,163,184,0.10)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}

      {/* Telemetry lines (hub → nodes) */}
      {nodes.map((n) => {
        const { x, y } = nodePos(n);
        return (
          <line
            key={`line-${n.id}`}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke={statusStroke[n.status]}
            strokeWidth="1.2"
            strokeDasharray={n.status === "live" ? "0" : "4 4"}
            opacity={n.status === "planned" ? 0.55 : 0.85}
          />
        );
      })}

      {/* Satellite nodes */}
      {nodes.map((n) => {
        const { x, y } = nodePos(n);
        const labelOnRight = x >= CX;
        const labelDx = labelOnRight ? 18 : -18;
        const anchor = labelOnRight ? "start" : "end";

        return (
          <g key={n.id}>
            {/* Outer halo */}
            <circle
              cx={x}
              cy={y}
              r="18"
              fill="url(#nodeFill)"
              stroke={statusStroke[n.status]}
            />

            {/* Inner dot */}
            <circle
              cx={x}
              cy={y}
              r="6"
              fill={statusColor[n.status]}
            />

            {/* Label */}
            <text
              x={x + labelDx}
              y={y + 4}
              textAnchor={anchor}
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="12"
              fill="#e2e8f0"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Central CIN hub */}
      <circle cx={CX} cy={CY} r="78" fill="url(#cinHubFill)" />
      <circle
        cx={CX}
        cy={CY}
        r="56"
        fill="rgba(5,8,22,0.7)"
        stroke="rgba(103,232,249,0.55)"
        strokeWidth="1.2"
      />
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="#f8fafc"
      >
        CIN
      </text>
      <text
        x={CX}
        y={CY + 16}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        letterSpacing="2"
        fill="#67e8f9"
      >
        CRABIONICS INTELLIGENCE
      </text>

      {/* Legend */}
      <g transform={`translate(${WIDTH - 30} ${HEIGHT - 80})`}>
        {[
          { label: "Live",    color: statusColor.live    },
          { label: "Pilot",   color: statusColor.pilot   },
          { label: "Planned", color: statusColor.planned },
        ].map((item, i) => (
          <g key={item.label} transform={`translate(0 ${i * 22})`}>
            <circle cx={-8} cy={0} r="5" fill={item.color} />
            <text
              x={-20}
              y={4}
              textAnchor="end"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="11"
              fill="#94a3b8"
            >
              {item.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
