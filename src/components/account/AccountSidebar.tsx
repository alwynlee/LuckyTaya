import { useAuth } from '../../contexts/AuthContext';

interface AccountSidebarProps {
  activePanel: string;
  onSelectPanel: (panel: string) => void;
  onLogout: () => void;
}

const navGroups = [
  {
    items: [
      { id: 'wallet', label: 'Wallet & Balances', icon: '💰' },
      { id: 'bet-history', label: 'Bet History', icon: '🎰' },
      { id: 'activity', label: 'Activity Log', icon: '📋' },
    ],
  },
  {
    items: [
      { id: 'profile', label: 'Personal Details', icon: '👤' },
      { id: 'kyc', label: 'Verification / KYC', icon: '🪪' },
      { id: 'security', label: 'Security', icon: '🔐' },
      { id: 'responsible', label: 'Responsible Gaming', icon: '🛡️' },
      { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    ],
  },
];

export default function AccountSidebar({ activePanel, onSelectPanel, onLogout }: AccountSidebarProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-4 flex flex-col gap-4">
      {/* Profile Card */}
      <div className="flex items-center gap-3 pb-4 border-b border-(--color-border)">
        <div className="w-12 h-12 rounded-full bg-(--color-dark) text-white flex items-center justify-center font-bold text-sm shrink-0">
          AL
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm text-(--color-dark) truncate">Alwyn Santos</div>
          <div className="text-xs text-(--color-muted)">LP-2024-00847</div>
          <div className="flex gap-1.5 mt-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-(--color-accent)/15 text-(--color-accent) font-medium">
              VIP Gold
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-(--color-accent2)/15 text-(--color-accent2) font-medium">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {navGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {gi > 0 && <div className="border-t border-(--color-border) my-1" />}
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectPanel(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                  activePanel === item.id
                    ? 'bg-(--color-bg2) font-semibold text-(--color-dark) shadow-sm ring-1 ring-(--color-border)'
                    : 'text-(--color-muted) hover:bg-(--color-bg3) hover:text-(--color-dark)'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <span className="text-base">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  );
}
