import CasinoFilter from '../components/casino/CasinoFilter';

export default function CasinoPage() {
  return (
    <div className="min-h-screen px-6 py-10 bg-bg">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-2xl font-black mb-6 text-dark">
          Casino <span className="text-accent2">Games</span>
        </div>
        <CasinoFilter />
      </div>
    </div>
  );
}
