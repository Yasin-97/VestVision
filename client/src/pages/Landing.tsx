import { useRef } from "react";
import LandingNavbar from "../components/LandingNavbar";
import { HeroHighlight } from "../components/HeroHighlight";
import RecentProjects from "../components/landing/RecentProjects";
import Features from "../components/landing/Features";
import FAQs from "../components/landing/FAQs";
import Hero from "../components/landing/Hero";
import LandingStats from "../components/landing/LandingStats";
type Props = {};

const Landing = (props: Props) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const recentProjectsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const FAQRef = useRef<HTMLDivElement>(null);

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const scrollToRecentProjects = () => {
    recentProjectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFAQ = () => {
    FAQRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#13131a]">
      <HeroHighlight
        containerClassName="h-screen"
        className=" antialiased bg-grid-white/[0.02]"
      >
        <LandingNavbar
          scrollToHome={scrollToHome}
          scrollToRecentProjects={scrollToRecentProjects}
          scrollToFeatures={scrollToFeatures}
          scrollToFAQ={scrollToFAQ}
        />
        <Hero />
      </HeroHighlight>
      <div ref={recentProjectsRef}>
        <RecentProjects />
        <LandingStats />
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
      <div ref={FAQRef}>
        <FAQs />
      </div>
    </div>
  );
};

export default Landing;
