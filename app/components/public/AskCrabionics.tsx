"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import v from "./Refinements.module.css";
const Panel = dynamic(() => import("./FaqPanel"), { ssr: false });
export default function AskCrabionics() {
  const path = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  if (
    path.startsWith("/control-tower") ||
    path.startsWith("/sign-") ||
    path.endsWith("/confirm") ||
    path.endsWith("/review")
  )
    return null;
  const open = openAt === path;
  function close() {
    setOpenAt(null);
    button.current?.focus();
  }
  return (
    <>
      {open && <Panel close={close} />}
      <button
        ref={button}
        className={v.chatLauncher}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => (open ? close() : setOpenAt(path))}
      >
        {open ? "Close assistant" : "Ask Crabionics"}{" "}
        <span aria-hidden="true">◌</span>
      </button>
    </>
  );
}
