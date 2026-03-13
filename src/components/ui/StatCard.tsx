interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center p-4">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-(--color-muted) mt-1">{label}</div>
    </div>
  );
}
