interface BadgeProps {
  type: 'hot' | 'new' | 'vip' | 'verified';
  children?: React.ReactNode;
}

const styles: Record<string, string> = {
  hot: 'bg-(--color-accent2) text-white',
  new: 'bg-[#888] text-white',
  vip: 'bg-[#bfa14a] text-[#1a1a1a]',
  verified: 'bg-(--color-bg2) text-(--color-muted) border border-(--color-border)',
};

const defaults: Record<string, string> = {
  hot: 'HOT',
  new: 'NEW',
  vip: 'VIP',
  verified: 'Verified',
};

export default function Badge({ type, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${styles[type]}`}
    >
      {children ?? defaults[type]}
    </span>
  );
}
