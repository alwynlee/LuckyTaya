interface WalletPanelProps {
  onBack?: () => void;
}

const balances = [
  { label: 'Main Balance', amount: '₱12,450.00', sub: 'Available for play & withdrawal' },
  { label: 'Bonus Balance', amount: '₱2,000.00', sub: '5x wagering requirement remaining' },
  { label: 'Pending Withdrawal', amount: '₱5,000.00', sub: 'Processing — est. 24 hrs' },
];

export default function WalletPanel({ onBack }: WalletPanelProps) {
  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Wallet & Balances</h2>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {balances.map((b) => (
          <div key={b.label} className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-4">
            <div className="text-xs text-(--color-muted) mb-1">{b.label}</div>
            <div className="text-xl font-bold text-(--color-dark)">{b.amount}</div>
            <div className="text-[11px] text-(--color-muted) mt-1">{b.sub}</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-6 py-2.5 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Deposit
        </button>
        <button className="px-6 py-2.5 rounded-lg border border-(--color-dark) text-(--color-dark) text-sm font-medium hover:bg-(--color-bg3) transition-colors cursor-pointer">
          Withdraw
        </button>
        <button className="px-6 py-2.5 rounded-lg border border-(--color-border) text-(--color-muted) text-sm font-medium hover:bg-(--color-bg3) transition-colors cursor-pointer">
          Transfer
        </button>
      </div>
    </div>
  );
}
