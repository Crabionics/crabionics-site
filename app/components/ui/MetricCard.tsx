type MetricCardProps = {
  value: string;
  label: string;
};

export default function MetricCard({
  value,
  label,
}: MetricCardProps) {
  return (
    <div className="glass-card p-6">

      <p className="text-4xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-3 text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
}