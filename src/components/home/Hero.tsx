import { useNavigate } from 'react-router-dom';
import StatCard from '../ui/StatCard';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-(--color-bg3) border-b-2 border-dashed border-(--color-border) pt-20 pb-[70px] max-md:pt-14 max-md:pb-12">
      {/* Section label */}
      <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-(--color-muted)">
        [ HERO BANNER ]
      </span>

      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 bg-(--color-bg2) border border-(--color-border) rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
          <span className="text-xs font-semibold text-(--color-muted) uppercase tracking-wide">
            Live Games Active
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-(--color-dark) leading-tight mb-4">
          Play Bold. Win Big. Get Lucky.
        </h1>

        {/* Subtitle */}
        <p className="text-(--color-muted) text-base max-w-xl mx-auto mb-8 leading-relaxed">
          The Philippines' most trusted online casino. Experience premium slots, live dealer
          tables, and instant-win games with industry-leading payouts.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/sportsbook')}
          className="bg-(--color-accent2) text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide cursor-pointer transition-all duration-200 hover:brightness-110"
        >
          Bet Now
        </button>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-12 border-t border-(--color-border) pt-8">
          <StatCard value="₱4.2M" label="Today's Jackpot" />
          <StatCard value="18K+" label="Players Online" />
          <StatCard value="98.2%" label="Payout Rate" />
          <StatCard value="500+" label="Games Available" />
        </div>
      </div>
    </section>
  );
}
