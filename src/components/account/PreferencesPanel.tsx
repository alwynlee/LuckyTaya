import { useState } from 'react';
import Toggle from '../ui/Toggle';

interface PreferencesPanelProps {
  onBack?: () => void;
}

export default function PreferencesPanel({ onBack }: PreferencesPanelProps) {
  const [promotions, setPromotions] = useState(true);
  const [gameResults, setGameResults] = useState(true);
  const [jackpotAlerts, setJackpotAlerts] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Preferences</h2>

      {/* Notifications */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--color-dark)">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-(--color-dark)">Promotions & Offers</div>
            <Toggle checked={promotions} onChange={setPromotions} />
          </div>
          <div className="border-t border-(--color-border)" />
          <div className="flex items-center justify-between">
            <div className="text-sm text-(--color-dark)">Game Results</div>
            <Toggle checked={gameResults} onChange={setGameResults} />
          </div>
          <div className="border-t border-(--color-border)" />
          <div className="flex items-center justify-between">
            <div className="text-sm text-(--color-dark)">Jackpot Alerts</div>
            <Toggle checked={jackpotAlerts} onChange={setJackpotAlerts} />
          </div>
          <div className="border-t border-(--color-border)" />
          <div className="flex items-center justify-between">
            <div className="text-sm text-(--color-dark)">Security Alerts</div>
            <Toggle checked={securityAlerts} onChange={setSecurityAlerts} />
          </div>
        </div>
      </div>

      {/* Display Language */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-(--color-dark)">Display Language</h3>
        <select className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
          <option>English</option>
          <option>Filipino</option>
        </select>
      </div>

      {/* Currency Display */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-(--color-dark)">Currency Display</h3>
        <select className="w-full px-3 py-2 text-sm bg-(--color-bg) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
          <option>PHP (₱)</option>
          <option>USD ($)</option>
        </select>
      </div>
    </div>
  );
}
