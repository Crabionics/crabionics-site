import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return <footer className="border-t border-slate-200 bg-[#0A1F45] text-white">
    <div className="container-shell py-14">
      <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div><div className="flex items-center gap-3"><Image src="/logo.png" alt="Crabionics" width={42} height={42} className="h-10 w-10" /><span className="text-xl font-bold">Crabionics</span></div><p className="mt-5 max-w-md text-sm leading-7 text-slate-300">Production infrastructure for mud-crab aquaculture, combining habitat, sensing, edge control and operating software.</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/system" className="text-slate-200 hover:text-white">System</Link><Link href="/producers" className="text-slate-200 hover:text-white">For producers</Link><Link href="/validation" className="text-slate-200 hover:text-white">Validation</Link><Link href="/insights" className="text-slate-200 hover:text-white">Insights</Link></div></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#65c7e8]">Company</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/company" className="text-slate-200 hover:text-white">Company</Link><Link href="/investors" className="text-slate-200 hover:text-white">Investors</Link><Link href="/contact" className="text-slate-200 hover:text-white">Talk to us</Link><a href="https://www.linkedin.com/company/crabionics-aquaculture-private-limited/" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white">LinkedIn</a></div></div>
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.</p><div className="flex gap-4"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </div>
  </footer>;
}
