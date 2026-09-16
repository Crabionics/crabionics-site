import Image from "next/image";
import Link from "next/link";

const linkedInUrl = "https://www.linkedin.com/company/crabionics-aquaculture-private-limited/";

export default function Footer() {
  return <footer className="border-t border-slate-200 bg-[#f8fafc]">
    <div className="container-shell py-14">
      <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3"><Image src="/logo.png" alt="Crabionics" width={42} height={42} className="h-10 w-10" /><span className="text-xl font-bold text-[#102C5C]">Crabionics</span></div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Infrastructure for more controlled mud-crab production. Habitat, sensing, local action and operating software built around the production problem.</p>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#8bcfe4] bg-white px-4 py-2.5 text-sm font-semibold text-[#102C5C] shadow-sm transition hover:border-[#168bb8] hover:shadow-md">Follow company updates <span aria-hidden="true">↗</span></a>
        </div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/system" className="text-slate-600 hover:text-[#102C5C]">System</Link><Link href="/producers" className="text-slate-600 hover:text-[#102C5C]">For Producers</Link><Link href="/validation" className="text-slate-600 hover:text-[#102C5C]">Validation</Link><Link href="/insights" className="text-slate-600 hover:text-[#102C5C]">Insights</Link></div></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Company</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/company" className="text-slate-600 hover:text-[#102C5C]">Company</Link><Link href="/investors" className="text-slate-600 hover:text-[#102C5C]">Investors</Link><Link href="/contact" className="text-slate-600 hover:text-[#102C5C]">Talk to us</Link><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#102C5C]">LinkedIn ↗</a></div></div>
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Crabionics Aquaculture Pvt. Ltd.</p><div className="flex gap-4"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </div>
  </footer>;
}
