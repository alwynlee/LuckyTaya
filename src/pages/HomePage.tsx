import Hero from '../components/home/Hero';
import Ticker from '../components/home/Ticker';
import Promotions from '../components/home/Promotions';
import FeaturedGames from '../components/home/FeaturedGames';
import BilyarbetPromo from '../components/home/BilyarbetPromo';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Promotions />
      <FeaturedGames />
      <BilyarbetPromo />
    </>
  );
}
