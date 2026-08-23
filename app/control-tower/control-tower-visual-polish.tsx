"use client";

import React from "react";
import ControlTowerTabsV32 from "./control-tower-tabs-v3-2";
import styles from "./control-tower-v3.module.css";
import type { TowerData } from "./control-tower-tabs";

export default function ControlTowerVisualPolish({data}:{data:TowerData}) {
  return <>
    <style jsx global>{`
      /* The global navbar is fixed; keep Control Tower sticky tabs below it. */
      .${styles.tabs} {
        top: calc(var(--site-header-height) + .5rem) !important;
      }

      /* Semantic correction: G1 is implemented early, not programme-validated. */
      .${styles.gateBoard} > button:nth-child(2) .${styles.badge} {
        border-color:#f4d48a !important;
        background:#fffbeb !important;
        color:#9a6700 !important;
      }

      /* Make the five-system map legible at a glance. */
      .${styles.mapNode} { position:relative; }
      .${styles.mapNode}::before {
        display:grid;
        place-items:center;
        width:2.15rem;
        height:2.15rem;
        margin-bottom:.35rem;
        border:1px solid #dbe5ef;
        border-radius:.7rem;
        background:#f8fbfd;
        color:#0f6174;
        font-size:1.05rem;
        line-height:1;
        font-weight:800;
      }
      .${styles.mapNode}:nth-child(1)::before { content:"⌂"; }
      .${styles.mapNode}:nth-child(3)::before { content:"⌁"; }
      .${styles.mapNode}:nth-child(5)::before { content:"▦"; }
      .${styles.mapNode}:nth-child(7)::before { content:"⚙"; }
      .${styles.mapNode}:nth-child(9)::before { content:"◉"; }

      /* Keep arrows attached to the flow. At wrapping widths, remove the
         detached arrow glyphs and use vertical connectors instead. */
      @media (max-width:1080px) {
        .${styles.companyMap} { grid-template-columns:repeat(5,minmax(0,1fr)) !important; }
        .${styles.companyMap} .${styles.mapArrow} { display:none !important; }
      }
      @media (max-width:760px) {
        .${styles.companyMap} { grid-template-columns:1fr !important; }
        .${styles.mapNode} { padding-bottom:1.45rem; }
        .${styles.mapNode}:not(:last-child)::after {
          content:"↓";
          position:absolute;
          left:50%;
          bottom:.18rem;
          transform:translateX(-50%);
          color:#94a3b8;
          font-size:1rem;
          font-weight:900;
        }
      }

      /* Capital flow: never leave a connector pointing into an empty row. */
      @media (max-width:1080px) {
        .${styles.capitalFlow} { display:grid !important; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.55rem !important; }
        .${styles.capitalArrow} { display:none !important; }
      }
      @media (max-width:760px) {
        .${styles.capitalFlow} { grid-template-columns:1fr !important; }
        .${styles.capitalStep} { max-width:none !important; position:relative; padding-bottom:1.45rem !important; }
        .${styles.capitalStep}:not(:last-child)::after {
          content:"↓";
          position:absolute;
          left:50%;
          bottom:.1rem;
          transform:translateX(-50%);
          color:#94a3b8;
          font-size:.9rem;
          font-weight:900;
        }
      }

      /* Subsystem recognition in the Technology view. */
      .${styles.stackRow} { position:relative; }
      .${styles.stackRow}::before {
        display:grid;
        place-items:center;
        width:2rem;
        height:2rem;
        border:1px solid #dbe5ef;
        border-radius:.65rem;
        background:#f8fbfd;
        color:#0f6174;
        font-size:1rem;
        font-weight:800;
      }
      .${styles.stackRow}:nth-child(1)::before { content:"⌂"; }
      .${styles.stackRow}:nth-child(2)::before { content:"⌁"; }
      .${styles.stackRow}:nth-child(3)::before { content:"▦"; }
      .${styles.stackRow}:nth-child(4)::before { content:"⚙"; }
      .${styles.stackRow}:nth-child(5)::before { content:"◉"; }
    `}</style>
    <ControlTowerTabsV32 data={data} />
  </>;
}