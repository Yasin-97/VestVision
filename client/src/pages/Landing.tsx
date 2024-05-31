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
        <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2 flex flex-col items-center justify-center">
          <p className="bg-black text-md text-[#808191] my-10 rounded-xl border border-[#28282e] py-1 px-3 font-semibold">
            <MdOutlineGeneratingTokens className=" text-xl text-[#ffd900bb] inline" />{" "}
            The Launchpad for Technological Renaissance
          </p>
          <div className="text-center text-2xl pb-5 md:text-5xl px-6  bg-clip-text text-transparent bg-gradient-to-b from-white to bg-white bg-opacity-50">
            <span
              className="bg-gradient-to-b from-[#1DC071] font-semibold
            to bg-[#77D9AA] bg-opacity-50 bg-clip-text text-transparent text-7xl "
            >
              VestVision;
            </span>{" "}
            Where Each Dot
          </div>
          <div className="flex !leading-[80px] text-center text-2xl pb-5 md:text-5xl px-6  bg-clip-text text-transparent bg-gradient-to-b from-white to bg-white bg-opacity-50">
            Has Its Own
            <div className="min-w-[180px] text-left">
              <FlipWords
                words={["Impact", "Dream", "Vision"]}
                className="text-slate-100 font-semibold"
              />
            </div>
          </div>
          <Button
            title="Make Your Impact"
            btnType="button"
            handleClick={() => {}}
            styles=" border border-[#1DC071] bg-black mt-10 transitoin-all hover:bg-[#1DC071] !text-xl"
          />
        </div>
      </HeroHighlight>
      <GraphicDesign />

      <div className="flex flex-col mx-auto border-b-8 border-l border-purple-500 rounded-bl-xl p-5 w-[90%]">
        <div className=" flex justify-center bg-[#111]ounded-[8px] w-full ">
          <div className="flex flex-col gap-y-2 items-center px-20 ">
            <h4 className="text-gray-200 text-4xl font-bold  ">4,8900+</h4>
            <p className="bg-clip-text text-transparent font-bold text-[14px] bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
              Much better
            </p>
          </div>
          <div className="flex flex-col gap-y-2 items-center px-20 ">
            <h4 className="text-gray-200 text-4xl font-bold  ">3,800+</h4>
            <p className="bg-clip-text text-transparent font-bold text-[14px] bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
              Much better
            </p>
          </div>
          <div className="flex flex-col gap-y-2 items-center px-20 ">
            <h4 className="text-gray-200 text-4xl font-bold  ">3,800+</h4>
            <p className="bg-clip-text text-transparent font-bold text-[14px] bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
              Much better
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-gray-200 pr-2 font-semibold text-[1rem]">
            Recent Investors
          </p>
          <InfiniteCards
            speed="slow"
            className="flex-1"
            items={[
              { quote: "1 this is the quote" },
              { quote: "2 this is the quote" },
              { quote: "3 this is the quote" },
              { quote: "4 this is the quote" },
            ]}
          />
        </div>
      </div>

      <Services />
      <FAQs />
    </div>
  );
};

export default Landing;
