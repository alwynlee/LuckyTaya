interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-[46px] h-[26px] rounded-full transition-colors duration-200 ${
          checked ? 'bg-(--color-dark)' : 'bg-(--color-border)'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-[18px] h-[18px] rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-sm text-(--color-muted)">{label}</span>}
    </label>
  );
}
