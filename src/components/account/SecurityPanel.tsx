import { useState } from 'react';
import Toggle from '../ui/Toggle';

interface SecurityPanelProps {
  onBack?: () => void;
}

const loginHistory = [
  { device: '📱', name: 'iPhone 15 — Safari', time: 'Now', status: 'Current session', current: true },
  { device: '💻', name: 'Chrome — Windows 11', time: 'Yesterday, 09:14 AM', status: 'Manila, PH', current: false },
  { device: '📱', name: 'Samsung Galaxy S24 — App', time: '2 days ago, 18:30', status: 'Quezon City, PH', current: false },
];

export default function SecurityPanel({ onBack }: SecurityPanelProps) {
  const [twoFA, setTwoFA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Security</h2>

      {/* Password Section */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-(--color-dark)">Change Password</h3>
            <p className="text-xs text-(--color-muted) mt-0.5">Last changed 30 days ago</p>
          </div>
          <button className="px-4 py-2 text-sm border border-(--color-border) rounded-lg text-(--color-dark) hover:bg-(--color-bg3) transition-colors cursor-pointer">
            Change
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-(--color-dark)">Login History</h3>
        <div className="space-y-2">
          {loginHistory.map((entry, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-(--color-bg) border border-(--color-border)">
              <span className="text-xl">{entry.device}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-(--color-dark) truncate">{entry.name}</div>
                <div className="text-xs text-(--color-muted)">{entry.time}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                entry.current
                  ? 'bg-green-50 text-green-600'
                  : 'bg-(--color-bg3) text-(--color-muted)'
              }`}>
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-(--color-dark)">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-(--color-dark)">Two-Factor Authentication (2FA)</div>
              <div className="text-xs text-(--color-muted)">Add an extra layer of security</div>
            </div>
            <Toggle checked={twoFA} onChange={setTwoFA} />
          </div>
          <div className="border-t border-(--color-border)" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-(--color-dark)">Login Email Alerts</div>
              <div className="text-xs text-(--color-muted)">Get notified of new logins</div>
            </div>
            <Toggle checked={emailAlerts} onChange={setEmailAlerts} />
          </div>
        </div>
      </div>
    </div>
  );
}
