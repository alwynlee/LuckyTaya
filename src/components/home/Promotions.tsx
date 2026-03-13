import { useNavigate } from 'react-router-dom';

interface Promo {
  emoji: string;
  label: string;
  title: string;
  description: string;
  badge: string;
  cta: string;
  to: string;
}

const promos: Promo[] = [
  {
    emoji: '🎁',
    label: 'Welcome Bonus',
    title: '100% First Deposit',
    description:
      'Double your first deposit up to ₱10,000. Start your winning journey with extra funds on us.',
    badge: 'New Player',
    cta: 'Claim Bonus',
    to: '/promotions',
  },
  {
    emoji: '🔄',
    label: 'Daily Reload',
    title: '20% Reload Bonus',
    description:
      'Get 20% extra on every deposit, every day. Keep the momentum going with daily reload rewards.',
    badge: 'Daily',
    cta: 'Reload Now',
    to: '/promotions',
  },
  {
    emoji: '🏅',
    label: 'VIP Program',
    title: 'Earn Points. Level Up.',
    description:
      'Unlock exclusive perks, higher limits, and personal account managers as you climb the VIP tiers.',
    badge: 'VIP',
    cta: 'Learn More',
    to: '/promotions',
  },
];

export default function Promotions() {
  const navigate = useNavigate();

  return (
    <section className="bg-(--color-bg) py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Promotions</h2>
        <p className="text-(--color-muted) text-sm text-center mb-10">
          Take advantage of our latest offers
        </p>

        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {promos.map((promo) => (
            <div
              key={promo.label}
              className="bg-white border border-(--color-border) rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] cursor-pointer"
            >
              {/* Emoji thumbnail */}
              <div className="h-36 bg-(--color-bg3) flex items-center justify-center text-5xl grayscale">
                {promo.emoji}
              </div>

              {/* Info */}
              <div className="p-5">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wide bg-(--color-bg2) text-(--color-muted) border border-(--color-border) rounded px-2 py-0.5 mb-2">
                  {promo.badge}
                </span>
                <p className="text-xs uppercase tracking-wider text-(--color-muted) mb-1">
                  {promo.label}
                </p>
                <h3 className="text-lg font-bold text-(--color-dark) mb-2">{promo.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed mb-4">{promo.description}</p>
                <button
                  onClick={() => navigate(promo.to)}
                  className="w-full bg-(--color-dark) text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90"
                >
                  {promo.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
