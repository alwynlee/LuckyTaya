import { useState } from 'react';
import GameCard from '../ui/GameCard';
import { allGames, casinoCategories } from '../../data/games';

export default function CasinoFilter() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? allGames
    : allGames.filter(g => {
        if (active === 'Table Games') return g.category === 'Table';
        if (active === 'Scratch Cards') return g.category === 'Scratch';
        if (active === 'Instant Win') return g.category === 'Instant';
        return g.category === active;
      });

  return (
    <div>
      <div className="flex gap-2.5 flex-wrap mb-8">
        {casinoCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 text-xs rounded-full border-2 font-bold cursor-pointer uppercase tracking-wide transition-all ${
              active === cat
                ? 'bg-dark text-white border-dark'
                : 'bg-white text-muted border-border hover:bg-dark hover:text-white hover:border-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {filtered.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
