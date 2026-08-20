type Layer = {
  index: string;
  name: string;
  sub: string;
};

const layers: Layer[] = [
  { index: "01", name: "Physical Layer",     sub: "Infrastructure" },
  { index: "02", name: "Sensor Layer",       sub: "Capture" },
  { index: "03", name: "Telemetry Layer",    sub: "Transport" },
  { index: "04", name: "State Layer",        sub: "Interpretation" },
  { index: "05", name: "Decision Layer",     sub: "Operational logic" },
  { index: "06", name: "Intelligence Layer", sub: "Cross-cycle learning" },
];

/**
 * Master Crabionics technology stack diagram.
 * Six layers stacked top-down with a closed-loop feedback arrow on the right.
 */
export default function StackDiagram() {
  // Layout constants
  const WIDTH = 900;
  const HEIGHT = 640;
  const STACK_X = 180;
  const STACK_W = 480;
  const ROW_H = 64;
  const ROW_GAP = 28;
  const TOP = 50;

  const rowY = (i: number) => TOP + i * (ROW_H + ROW_GAP);
  const lastY = rowY(layers.length - 1) + ROW_H / 2;
  const firstY = rowY(0) + ROW_H / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Crabionics six-layer technology stack: Physical → Sensor → Telemetry → State → Decision → Intelligence, with a closed-loop feedback arrow."
    >
      <defs>
        {/* Layer fill — subtle cyan glass */}
        <linearGradient id="layerFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(34,211,238,0.10)" />
          <stop offset="100%" stopColor="rgba(20,184,166,0.08)" />
        </linearGradient>

        {/* Stronger fill for the index pill */}
        <linearGradient id="pillFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(34,211,238,0.22)" />
          <stop offset="100%" stopColor="rgba(20,184,166,0.16)" />
        </linearGradient>

        {/* Arrow marker — forward (down) */}
        <marker
          id="arrowDown"
          viewBox="0 0 10 10"
          refX="5"
          refY="9"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L10,0 L5,10 z" fill="rgba(103,232,249,0.7)" />
        </marker>

        {/* Arrow marker — feedback (up) */}
        <marker
          id="arrowUp"
          viewBox="0 0 10 10"
          refX="5"
          refY="1"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0,10 L10,10 L5,0 z" fill="rgba(103,232,249,0.85)" />
        </marker>

        {/* Soft glow */}
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(34,211,238,0.18)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </radialGradient>
      </defs>

      {/* Soft background glow */}
      <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="320" fill="url(#glow)" />

      {/* LAYERS */}
      {layers.map((layer, i) => {
        const y = rowY(i);

        return (
          <g key={layer.index}>
            {/* Index pill on the left */}
            <rect
              x={STACK_X - 90}
              y={y + 12}
              width="64"
              height={ROW_H - 24}
              rx="10"
              fill="url(#pillFill)"
              stroke="rgba(103,232,249,0.30)"
            />
            <text
              x={STACK_X - 58}
              y={y + ROW_H / 2 + 5}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="14"
              fontWeight="600"
              fill="#67e8f9"
            >
              {layer.index}
            </text>

            {/* Layer block */}
            <rect
              x={STACK_X}
              y={y}
              width={STACK_W}
              height={ROW_H}
              rx="14"
              fill="url(#layerFill)"
              stroke="rgba(148,163,184,0.18)"
            />

            {/* Layer name */}
            <text
              x={STACK_X + 24}
              y={y + 28}
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="17"
              fontWeight="600"
              fill="#f8fafc"
            >
              {layer.name}
            </text>

            {/* Sub */}
            <text
              x={STACK_X + 24}
              y={y + 50}
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="11"
              letterSpacing="2"
              fill="#67e8f9"
              opacity="0.85"
            >
              {layer.sub.toUpperCase()}
            </text>

            {/* Down arrow connector */}
            {i !== layers.length - 1 && (
              <line
                x1={STACK_X + STACK_W / 2}
                y1={y + ROW_H + 2}
                x2={STACK_X + STACK_W / 2}
                y2={y + ROW_H + ROW_GAP - 4}
                stroke="rgba(103,232,249,0.45)"
                strokeWidth="1.5"
                markerEnd="url(#arrowDown)"
              />
            )}
          </g>
        );
      })}

      {/* CLOSED-LOOP FEEDBACK ARROW (right side, bottom → top) */}
      <path
        d={`
          M ${STACK_X + STACK_W + 20} ${lastY}
          C ${STACK_X + STACK_W + 130} ${lastY},
            ${STACK_X + STACK_W + 130} ${firstY},
            ${STACK_X + STACK_W + 20} ${firstY}
        `}
        fill="none"
        stroke="rgba(103,232,249,0.55)"
        strokeWidth="1.8"
        strokeDasharray="6 4"
        markerEnd="url(#arrowUp)"
      />

      {/* Feedback label */}
      <g transform={`translate(${STACK_X + STACK_W + 150} ${(firstY + lastY) / 2})`}>
        <rect
          x="-58"
          y="-14"
          width="116"
          height="28"
          rx="14"
          fill="rgba(5,8,22,0.85)"
          stroke="rgba(103,232,249,0.40)"
        />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="11"
          letterSpacing="2"
          fill="#67e8f9"
        >
          CLOSED LOOP
        </text>
      </g>

      {/* Bottom caption */}
      <text
        x={WIDTH / 2}
        y={HEIGHT - 18}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="12"
        fill="#94a3b8"
      >
        Each layer feeds the next — and the network feeds itself back through continuous operational data.
      </text>
    </svg>
  );
}
