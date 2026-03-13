interface ResponsiblePanelProps {
  onBack?: () => void;
}

export default function ResponsiblePanel({ onBack }: ResponsiblePanelProps) {
  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Responsible Gaming</h2>

      {/* Daily Deposit Limit */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-(--color-dark)">Daily Deposit Limit</h3>
          <p className="text-xs text-(--color-muted) mt-0.5">Current limit: ₱5,000 / day</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">New Limit (₱)</label>
          <input
            type="number"
            placeholder="Enter new daily limit"
            className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark)"
          />
        </div>
        <button className="px-5 py-2 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Update Limit
        </button>
      </div>

      {/* Session Time Limit */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-(--color-dark)">Session Time Limit</h3>
          <p className="text-xs text-(--color-muted) mt-0.5">Current limit: 2 hours per session</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-(--color-muted) mb-1">Session Duration</label>
          <select className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
            <option>30 minutes</option>
            <option>1 hour</option>
            <option selected>2 hours</option>
            <option>4 hours</option>
            <option>8 hours</option>
            <option>No limit</option>
          </select>
        </div>
        <button className="px-5 py-2 rounded-lg bg-(--color-dark) text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
          Update Limit
        </button>
      </div>

      {/* Self-Exclusion */}
      <div className="border-2 border-dashed border-(--color-border) rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-(--color-dark)">Self-Exclusion</h3>
        <p className="text-xs text-(--color-muted) leading-relaxed">
          If you feel you need a break from gambling, you can request a temporary or permanent self-exclusion
          from the platform. During this period, you will not be able to log in, deposit, or place any bets.
          This action cannot be reversed until the exclusion period ends.
        </p>
        <button className="px-5 py-2 rounded-lg border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer">
          Request Self-Exclusion
        </button>
      </div>
    </div>
  );
}
