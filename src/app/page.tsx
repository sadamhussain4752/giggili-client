import Hero from "@/components/home/Hero";
import TrendingArtists from "@/components/home/TrendingArtists";
import RegionalArtists from "@/components/home/RegionalArtists";
import PerformerSlider from "@/components/home/PerformerSlider";
import CenteredBanner from "@/components/home/CenteredBanner";


export default function Home() {
  return (
    <>
      <Hero />

      <PerformerSlider/>
      <TrendingArtists />
      <CenteredBanner src={require('../asset/bannerwall.png')}/>
      
      <RegionalArtists />


    </>
  );
}
