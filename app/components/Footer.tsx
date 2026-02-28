export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 text-neutral-400 text-sm">

        <div>
          <p className="text-neutral-100 font-semibold tracking-tight">
            Crabionics Aquaculture Pvt. Ltd.
          </p>
          <p className="mt-4">
            Engineering Predictable Coastal Production Infrastructure.
          </p>
        </div>

        <div>
          <p>Built in India</p>
          <p className="mt-2">Blue Economy Infrastructure Platform</p>
        </div>

        <div>
          <p>© 2026 Crabionics</p>
        </div>

      </div>
    </footer>
  );
}