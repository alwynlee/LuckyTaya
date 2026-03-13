const winners = [
  '@taya_wins just won ₱12,500 on Mega Slots 🎰',
  '@lucky_maria claimed ₱8,200 on Golden Dragon 🐉',
  '@juan_bet won ₱25,000 on Diamond Rush 💎',
  '@ace_player hit ₱5,800 on Poker Blitz 🃏',
  '@fortune99 just won ₱15,300 on Lucky Clover 🍀',
  '@bigwin_ph claimed ₱42,000 jackpot on Star Fortune 🌟',
  '@taya_queen won ₱3,500 on Bullseye Bonus 🎯',
  '@manila_bet hit ₱9,700 on Red Lantern 🏮',
];

export default function Ticker() {
  return (
    <div className="bg-(--color-bg2) border-t border-b border-(--color-border) overflow-hidden py-2.5">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Original items */}
        {winners.map((item, i) => (
          <span
            key={`a-${i}`}
            className="inline-block text-xs text-(--color-muted) mx-8 shrink-0"
          >
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {winners.map((item, i) => (
          <span
            key={`b-${i}`}
            className="inline-block text-xs text-(--color-muted) mx-8 shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
