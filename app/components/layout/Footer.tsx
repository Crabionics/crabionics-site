import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#071a36] text-white">
      <div className="container-shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr_0.6fr]">
          <div>
            <div className="flex items-center gap-3"><Image src="/logo.png" alt="Crabionics" width={42} height={42} className="h-10 w-10" /><span className="text-xl font-bold tracking-[-0.03em] text-white">Crabionics</span></div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">Production infrastructure for mud crab aquaculture — combining controlled habitat, sensing, edge control and operating intelligence.</p>
            <Link href="/contact" className="mt-6 inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Start a conversation →</Link>
          </div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/technology" className="text-slate-300 hover:text-white">Platform</Link><Link href="/validation" className="text-slate-300 hover:text-white">Validation</Link><Link href="/investors" className="text-slate-300 hover:text-white">Investors</Link><Link href="/company" className="text-slate-300 hover:text-white">Company</Link></div></div>
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Connect</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/contact" className="text-slate-300 hover:text-white">Contact</Link><a href="https://www.linkedin.com/company/crabionics-aquaculture-private-limited/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">LinkedIn</a><Link href="/privacy" className="text-slate-300 hover:text-white">Privacy</Link><Link href="/terms" className="text-slate-300 hover:text-white">Terms</Link></div></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.</p><p>Odisha, India · Built around production evidence.</p></div>
      </div>
    </footer>
  );
}
