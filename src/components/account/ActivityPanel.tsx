import { useState } from 'react';

interface ActivityPanelProps {
  onBack?: () => void;
}

const tabs = ['All Activity', 'Casino', 'Specialty', 'Financial', 'Account'];

const rows = [
  { icon: '🎰', event: 'Won — Aviator x4.7', product: 'Casino', date: 'Mar 12, 14:32', amount: '+₱2,350.00', balance: '₱14,800.00' },
  { icon: '🎰', event: 'Bet Placed — Aviator', product: 'Casino', date: 'Mar 12, 14:30', amount: '-₱500.00', balance: '₱12,450.00' },
  { icon: '💳', event: 'Deposit — GCash', product: 'Financial', date: 'Mar 12, 12:00', amount: '+₱5,000.00', balance: '₱12,950.00' },
  { icon: '🎁', event: 'Bonus Credited — Welcome', product: 'Promo', date: 'Mar 12, 12:01', amount: '+₱2,000.00', balance: '₱14,950.00' },
  { icon: '🃏', event: 'Lost — Live Baccarat T7', product: 'Live Casino', date: 'Mar 11, 18:47', amount: '-₱2,500.00', balance: '₱7,950.00' },
  { icon: '⚽', event: 'Won — PBA Ginebra vs SMB', product: 'Sports', date: 'Mar 11, 20:15', amount: '+₱1,850.00', balance: '₱10,450.00' },
  { icon: '💸', event: 'Withdrawal Requested', product: 'Financial', date: 'Mar 11, 16:00', amount: '-₱5,000.00', balance: '₱5,450.00' },
  { icon: '🔑', event: 'Login — iPhone 15', product: 'Account', date: 'Mar 12, 11:58', amount: '—', balance: '—' },
];

export default function ActivityPanel({ onBack }: ActivityPanelProps) {
  const [activeTab, setActiveTab] = useState('All Activity');

  return (
    <div className="space-y-6">
      {onBack && (
        <button onClick={onBack} className="md:hidden flex items-center gap-1 text-sm text-(--color-muted) hover:text-(--color-dark) mb-2 cursor-pointer">
          ← Back
        </button>
      )}

      <h2 className="text-lg font-bold text-(--color-dark)">Activity Log</h2>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto bg-(--color-bg3) rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab
                ? 'bg-(--color-dark) text-white'
                : 'text-(--color-muted) hover:text-(--color-dark)'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select className="px-3 py-2 text-sm bg-(--color-bg2) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
        <select className="px-3 py-2 text-sm bg-(--color-bg2) border border-(--color-border) rounded-lg text-(--color-dark) cursor-pointer">
          <option>All Types</option>
          <option>Wins</option>
          <option>Losses</option>
          <option>Deposits</option>
          <option>Withdrawals</option>
        </select>
        <button className="ml-auto px-4 py-2 text-sm border border-(--color-border) rounded-lg text-(--color-muted) hover:bg-(--color-bg3) cursor-pointer">
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-(--color-bg2) border border-(--color-border) rounded-xl overflow-hidden">
        {/* Header - hidden on mobile */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_100px_130px_100px_110px] gap-2 px-4 py-2.5 border-b border-(--color-border) text-xs font-semibold text-(--color-muted) uppercase tracking-wide">
          <span>Event</span>
          <span>Product</span>
          <span>Date & Time</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Balance After</span>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 sm:grid-cols-[1fr_100px_130px_100px_110px] gap-1 sm:gap-2 px-4 py-3 text-sm ${
              i < rows.length - 1 ? 'border-b border-(--color-border)' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{row.icon}</span>
              <span className="font-medium text-(--color-dark) truncate">{row.event}</span>
            </div>
            <div className="sm:flex sm:items-center">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-(--color-bg3) text-(--color-muted) font-medium">
                {row.product}
              </span>
            </div>
            <div className="text-xs text-(--color-muted) sm:flex sm:items-center">{row.date}</div>
            <div className={`text-right font-medium sm:flex sm:items-center sm:justify-end ${
              row.amount.startsWith('+') ? 'text-green-600' : row.amount.startsWith('-') ? 'text-red-500' : 'text-(--color-muted)'
            }`}>
              {row.amount}
            </div>
            <div className="text-right text-xs text-(--color-muted) sm:flex sm:items-center sm:justify-end">
              {row.balance}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-(--color-muted)">
        <span>1–8 of 312</span>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 rounded-lg border border-(--color-border) hover:bg-(--color-bg3) cursor-pointer">←</button>
          <button className="px-3 py-1.5 rounded-lg bg-(--color-dark) text-white cursor-pointer">1</button>
          <button className="px-3 py-1.5 rounded-lg border border-(--color-border) hover:bg-(--color-bg3) cursor-pointer">2</button>
          <button className="px-3 py-1.5 rounded-lg border border-(--color-border) hover:bg-(--color-bg3) cursor-pointer">3</button>
          <button className="px-3 py-1.5 rounded-lg border border-(--color-border) hover:bg-(--color-bg3) cursor-pointer">→</button>
        </div>
      </div>
    </div>
  );
}
