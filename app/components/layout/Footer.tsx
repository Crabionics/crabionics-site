import Link from "next/link";
import Image from "next/image";
import s from "../public/Identity.module.css";
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerGrid}>
          <div>
            <Link href="/" className={s.brand}>
              <span className={s.symbol}>
                <Image src="/logo.png" width={64} height={64} alt="" />
              </span>
              <span>Crabionics</span>
            </Link>
            <p>
              Mud-crab aquaculture, connected. Developing the physical
              environment and operating tools around the people doing the work.
            </p>
            <a
              className={s.social}
              href="https://www.linkedin.com/company/crabionics-aquaculture-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow company updates ↗
            </a>
          </div>
          <div>
            <h2>Explore</h2>
            <div className={s.footerLinks}>
              {[
                ["Solutions", "solutions"],
                ["For Producers", "producers"],
                ["AquaOS", "aquaos"],
                ["Workflow preview", "demo"],
                ["Early access", "early-access"],
                ["How it connects", "system"],
                ["Research & validation", "validation"],
                ["Resources", "resources"],
              ].map(([title, route]) => (
                <Link href={"/" + route} key={route}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Company</h2>
            <div className={s.footerLinks}>
              <Link href="/company">People & company</Link>
              <Link href="/investors">Investors</Link>
              <Link href="/contact">Discuss a partnership</Link>
              <a href="mailto:info@crabionics.com">info@crabionics.com</a>
            </div>
          </div>
        </div>
        <div className={s.legal}>
          <p>© {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.</p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
