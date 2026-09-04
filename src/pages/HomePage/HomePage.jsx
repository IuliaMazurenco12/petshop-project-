import Hero from './Hero.jsx';
import DiscountBanner from './DiscountBanner.jsx';
import CategoryPage from '../CategoryPage/CategoryPage.jsx';   // ← вот тут

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryPage />   
      <DiscountBanner />
    </>
  );
}
export default HomePage;