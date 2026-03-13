import { useState } from 'react';

interface BetHistoryPanelProps {
  onBack?: () => void;
}

const stats = [
  { label: 'Total Bets', value: '147' },
  { label: 'Total Wagered', value: '₱58,200' },
  { label: 'Net Result', value: '+₱4,370' },
  { label: 'Unsettled', value: '3' },
];

const tabs = [
  { id: 'unsettled', label: 'Unsettled', count: 3 },
  { id: 'settled', label: 'Settled' },
  { id: 'all', label: 'All Bets' },
];

const bets = [
  {
    id: 'BET-20240312-001',
    game: 'Aviator',
    product: 'Casino',
    provider: 'Spribe',
    amount: '₱500.00',
    potentialWin: '₱2,350.00',
    date: 'Mar 12, 2024 · 14:32',
    status: 'Unsettled',
    statusColor: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'BET-20240311-047',
    game: 'PBA — Ginebra vs SMB',
    product: 'Sports',
    provider: 'SBO Sports',
    amount: '₱1,000.00',
    potentialWin: '₱1,850.00',
    date: 'Mar 11, 2024 · 20:15',
    status: 'Won',
    statusColor: 'text-green-600 bg-green-50',
  },
  {
    id: 'BET-20240311-032',
    game: 'Live Baccarat — Table 7',
    product: 'Live Casino',
    provider: 'Evolution',
    amount: '₱2,500.00',
    potentialWin: '₱5,000.00',
    date: 'Mar 11, 2024 · 18:47',
    status: 'Lost',
    statusColor: 'text-red-500 bg-red-50',
  },
];

export default function BetHistoryPanel({ onBack }: BetHistoryPanelProps) {
  const [activeTab, setActiveTab] = useState('unsettled');
  const [expandedBet, setExpandedBet] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Bet History</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-(--color-bg2) border border-(--color-border) rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-(--color-dark)">{s.value}</div>
            <div className="text-xs text-(--color-muted)">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-(--color-bg3) rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-(--color-dark) text-white'
                : 'text-(--color-muted) hover:text-(--color-dark)'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-1 text-xs ${activeTab === tab.id ? 'text-white/70' : 'text-(--color-muted)'}`}>
                ({tab.count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select className="px-3 py-2 text-sm bg-(--color-bg2) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
          <option>All Products</option>
          <option>Casino</option>
          <option>Sports</option>
          <option>Live Casino</option>
        </select>
        <select className="px-3 py-2 text-sm bg-(--color-bg2) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
        <button className="ml-auto px-4 py-2 text-sm border border-(--color-border) rounded-lg text-(--color-muted) hover:bg-(--color-bg3) cursor-pointer">
          Export CSV
        </button>
      </div>

      {/* Bet Rows */}
      <div className="space-y-2">
        {bets.map((bet) => (
          <div key={bet.id} className="bg-(--color-bg2) border border-(--color-border) rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedBet(expandedBet === bet.id ? null : bet.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-(--color-bg3) transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${bet.statusColor}`}>
                  {bet.product}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-(--color-dark) truncate">{bet.game}</div>
                  <div className="text-xs text-(--color-muted)">{bet.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-semibold text-(--color-dark)">{bet.amount}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${bet.statusColor}`}>
                    {bet.status}
                  </span>
                </div>
                <span className="text-(--color-muted) text-xs">{expandedBet === bet.id ? '▲' : '▼'}</span>
              </div>
            </button>

            {expandedBet === bet.id && (
              <div className="px-4 pb-3 pt-1 border-t border-(--color-border) grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-(--color-muted)">Bet ID</div>
                  <div className="font-medium text-(--color-dark) mt-0.5">{bet.id}</div>
                </div>
                <div>
                  <div className="text-(--color-muted)">Game Provider</div>
                  <div className="font-medium text-(--color-dark) mt-0.5">{bet.provider}</div>
                </div>
                <div>
                  <div className="text-(--color-muted)">Potential Win</div>
                  <div className="font-medium text-(--color-dark) mt-0.5">{bet.potentialWin}</div>
                </div>
                <div>
                  <div className="text-(--color-muted)">Status</div>
                  <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded font-medium ${bet.statusColor}`}>
                    {bet.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
