import { useNavigate } from 'react-router-dom';

export default function BilyarbetPromo() {
  const navigate = useNavigate();

  const stats = [
    { value: '300+', label: 'Matches' },
    { value: '50+', label: 'Markets' },
    { value: 'Live', label: 'Streaming' },
  ];

  return (
    <section className="bg-(--color-bg2) border-t border-b border-dashed border-(--color-border) py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left column */}
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-(--color-muted) bg-(--color-bg3) border border-(--color-border) rounded px-3 py-1 mb-4">
            🎱 Now Live
          </span>

          <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
            Bilyarbet — Bet on the Break
          </h2>

          <p className="text-sm text-(--color-muted) leading-relaxed mb-3">
            The first dedicated billiards betting platform in the Philippines. Wager on your
            favorite players, matches, and tournaments with real-time odds and live streaming.
          </p>

          <p className="text-sm text-(--color-muted) leading-relaxed mb-6">
            From 8-ball to 9-ball, straight pool to one-pocket — every format, every major
            tournament, all in one place. Bet pre-match or live as the action unfolds.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-(--color-muted) mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/bilyarbet')}
            className="bg-(--color-accent2) text-white px-7 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide cursor-pointer transition-all duration-200 hover:brightness-110"
          >
            Explore Bilyarbet
          </button>
        </div>

        {/* Right column — image placeholders */}
        <div className="space-y-3">
          {/* Wide image */}
          <div className="h-44 bg-(--color-bg3) border-2 border-dashed border-(--color-border) rounded-xl flex items-center justify-center text-5xl grayscale">
            🎱
          </div>

          {/* Two small images */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-28 bg-(--color-bg3) border-2 border-dashed border-(--color-border) rounded-xl flex items-center justify-center text-4xl grayscale">
              🏆
            </div>
            <div className="h-28 bg-(--color-bg3) border-2 border-dashed border-(--color-border) rounded-xl flex items-center justify-center text-4xl grayscale">
              🎯
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
