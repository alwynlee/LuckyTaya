interface ButtonProps {
  variant?: 'solid' | 'outline' | 'yellow';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'solid',
  children,
  className = '',
  onClick,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const base =
    'px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    solid: 'bg-(--color-dark) text-white hover:opacity-90',
    outline: 'bg-transparent border border-(--color-border) text-(--color-muted) hover:bg-(--color-bg2)',
    yellow: 'bg-(--color-accent2) text-white hover:brightness-110',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
