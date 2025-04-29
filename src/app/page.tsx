"use client"
import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import TrendingArtists from "@/components/home/TrendingArtists";
import RegionalArtists from "@/components/home/RegionalArtists";
import PerformerSlider from "@/components/home/PerformerSlider";
import CenteredBanner from "@/components/home/CenteredBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "@/reducer/thunks"; // Adjust path as needed

export default function Home() {
  const dispatch = useDispatch<any>();

 

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <PerformerSlider />
      <TrendingArtists />
      <CenteredBanner src={require("../asset/banner1.png")} />
      <RegionalArtists />
    </>
  );
}
