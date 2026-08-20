import type { SVGProps } from "react";

/**
 * Minimal inline stroke-icon set (no external dependency).
 * All icons inherit `currentColor` and a 1.6 stroke; size via className (w-/h-).
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconChart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M7 15l3-3 3 2 4-5" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.6 5.3 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.3-3.6-8.5S9.6 5.8 12 3.5z" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14-1.5 0-2-0.5-2-2z" />
      <path d="M9 16c2.5-3 5-5 8-6" />
    </svg>
  );
}

export function IconDrop(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c3 4 5.5 6.6 5.5 9.7A5.5 5.5 0 0 1 6.5 13.2C6.5 10.1 9 7.5 12 3.5z" />
    </svg>
  );
}

export function IconWifi(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5a12 12 0 0 1 16 0" />
      <path d="M7 13a8 8 0 0 1 10 0" />
      <path d="M10 16.5a3.5 3.5 0 0 1 4 0" />
      <circle cx="12" cy="19.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChip(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3.5v2M14 3.5v2M10 18.5v2M14 18.5v2M3.5 10h2M3.5 14h2M18.5 10h2M18.5 14h2" />
    </svg>
  );
}

export function IconNetwork(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7v4m0 0l-5.5 5.2M12 11l5.5 5.2" />
    </svg>
  );
}

export function IconGear(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9L5.3 5.3" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFactory(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20V10l5 3V10l5 3V8l5 3v9z" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h7l9 9-7 7-9-9z" />
      <circle cx="8.5" cy="8.5" r="1.3" />
    </svg>
  );
}
