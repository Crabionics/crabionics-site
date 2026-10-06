"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import s from "../public/Identity.module.css";
const links = [
  ["Solutions", "/solutions"],
  ["For Producers", "/producers"],
  ["Research", "/validation"],
  ["Resources", "/resources"],
  ["Company", "/company"],
];
export default function Navbar() {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  function close() {
    setOpenAt(null);
  }
  function active(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      (href === "/solutions" && ["/system", "/aquaos"].includes(pathname))
    );
  }
  return (
    <header
      className={s.header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          close();
          toggle.current?.focus();
        }
      }}
    >
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <div className={s.masthead}>
        <Link
          className={s.brand}
          href="/"
          onClick={close}
          aria-label="Crabionics home"
        >
          <span className={s.symbol}>
            <Image src="/logo.png" alt="" width={64} height={64} />
          </span>
          <span>Crabionics</span>
        </Link>
        <nav className={s.desktopNav} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact#production" className={s.contact} onClick={close}>
          Discuss a pilot <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={toggle}
          className={s.menu}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpenAt(open ? null : pathname)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"}
            />
          </svg>
        </button>
      </div>
      <nav
        id="primary-navigation"
        className={s.navigation}
        hidden={!open}
        aria-label="Mobile navigation"
      >
        <div className={s.primary}>
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={active(href) ? "page" : undefined}
            >
              {label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className={s.secondary}>
          {[
            ["AquaOS", "/aquaos"],
            ["How it connects", "/system"],
            ["Investors", "/investors"],
          ].map(([label, href]) => (
            <Link href={href} key={href} onClick={close}>
              {label}
            </Link>
          ))}
        </div>
        <Link
          className={`${s.contact} ${s.mobileContact}`}
          href="/contact#production"
          onClick={close}
        >
          Discuss a pilot ↗
        </Link>
      </nav>
      <noscript>
        <nav className={s.fallback} aria-label="Site navigation">
          {[...links, ["AquaOS", "/aquaos"], ["Contact", "/contact"]].map(
            ([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ),
          )}
        </nav>
      </noscript>
    </header>
  );
}
