import { Link } from 'react-router-dom';
import GameCard from '../ui/GameCard';
import { featuredGames } from '../../data/games';

export default function FeaturedGames() {
  return (
    <section className="bg-(--color-bg2) py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-1">Featured Casino Games</h2>
        <p className="text-(--color-muted) text-sm text-center mb-10">Pick your game</p>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
        >
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/casino"
            className="inline-block bg-(--color-dark) text-white px-8 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90"
          >
            View All Games
          </Link>
        </div>
      </div>
    </section>
  );
}
