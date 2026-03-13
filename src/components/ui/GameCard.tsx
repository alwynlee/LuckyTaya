import type { Game } from '../../data/games';
import Badge from './Badge';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="group bg-(--color-bg2) border border-(--color-border) rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-[3px]">
      <div className="relative h-32 bg-(--color-bg3) flex items-center justify-center text-5xl">
        {game.emoji}
        {game.badge && (
          <div className="absolute top-2 right-2">
            <Badge type={game.badge} />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate">{game.name}</h3>
        <p className="text-xs text-(--color-muted) mt-0.5">{game.category}</p>
        <p className="text-xs text-(--color-accent2) font-bold mt-1">{game.jackpot}</p>
      </div>
    </div>
  );
}
