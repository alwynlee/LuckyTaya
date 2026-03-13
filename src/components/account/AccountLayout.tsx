import { useState } from 'react';
import AccountSidebar from './AccountSidebar';
import WalletPanel from './WalletPanel';
import BetHistoryPanel from './BetHistoryPanel';
import ActivityPanel from './ActivityPanel';
import ProfilePanel from './ProfilePanel';
import KYCPanel from './KYCPanel';
import SecurityPanel from './SecurityPanel';
import ResponsiblePanel from './ResponsiblePanel';
import PreferencesPanel from './PreferencesPanel';

const panels: Record<string, React.FC<{ onBack?: () => void }>> = {
  wallet: WalletPanel,
  'bet-history': BetHistoryPanel,
  activity: ActivityPanel,
  profile: ProfilePanel,
  kyc: KYCPanel,
  security: SecurityPanel,
  responsible: ResponsiblePanel,
  preferences: PreferencesPanel,
};

export default function AccountLayout() {
  const [activePanel, setActivePanel] = useState('wallet');
  const [showSidebar, setShowSidebar] = useState(true);

  const ActiveComponent = panels[activePanel] || WalletPanel;

  const handleSelectPanel = (panel: string) => {
    setActivePanel(panel);
    setShowSidebar(false);
  };

  const handleBack = () => {
    setShowSidebar(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Desktop: side-by-side grid */}
      <div className="hidden md:grid md:grid-cols-[260px_1fr] gap-6">
        <AccountSidebar
          activePanel={activePanel}
          onSelectPanel={setActivePanel}
          onLogout={() => {}}
        />
        <div className="min-w-0">
          <ActiveComponent />
        </div>
      </div>

      {/* Mobile: show sidebar OR content */}
      <div className="md:hidden">
        {showSidebar ? (
          <AccountSidebar
            activePanel={activePanel}
            onSelectPanel={handleSelectPanel}
            onLogout={() => {}}
          />
        ) : (
          <ActiveComponent onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
