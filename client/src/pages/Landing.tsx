import React, { useRef } from "react";
import LandingNavbar from "../components/LandingNavbar";
import { HeroHighlight, Highlight } from "../components/HeroHighlight";
import { FlipWords } from "../components/FlipWords";
import { Button } from "../components";
import { InfiniteCards } from "../components/landing/InfiniteCards";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import GraphicDesign from "../components/landing/RecentCampaigns";
import Services from "../components/landing/Services";
import FAQs from "../components/landing/FAQs";
import Hero from "../components/landing/Hero";
import LandingStats from "../components/landing/LandingStats";
type Props = {};

const Landing = (props: Props) => {
  const websiteDesignRef = useRef<HTMLDivElement>(null);
  const graphicDesignRef = useRef<HTMLDivElement>(null);
  const shopifyStoresRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToWebsiteDesign = () => {
    websiteDesignRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const scrollToGraphicDesign = () => {
    graphicDesignRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShopifyStores = () => {
    shopifyStoresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBrands = () => {
    brandsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to Services section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-black/[0.98]">
      <HeroHighlight
        containerClassName="h-screen"
        className=" antialiased bg-grid-white/[0.02]"
      >
        <LandingNavbar
          scrollToWebsiteDesign={scrollToWebsiteDesign}
          scrollToGraphicDesign={scrollToGraphicDesign}
          scrollToShopifyStores={scrollToShopifyStores}
          scrollToBrands={scrollToBrands}
          scrollToServices={scrollToServices}
        />
        <Hero />
      </HeroHighlight>
      <GraphicDesign />

      <LandingStats />

      <Services />
      <FAQs />
    </div>
  );
};

export default Landing;
