import { MdOutlineGeneratingTokens } from "react-icons/md";
import { FlipWords } from "../FlipWords";
import Button from "../dashboard/Button";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2 flex flex-col items-center justify-center">
      <p className="bg-black text-xs sm:text-sm md:text-md text-[#808191] my-10 rounded-xl border border-[#28282e] py-1 px-3 font-semibold">
        <MdOutlineGeneratingTokens className=" text-xl text-[#ffd900bb] inline" />{" "}
        The Launchpad for Technological Renaissance
      </p>
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-4 sm:mb-10">
        <span
          className="bg-gradient-to-b from-[#1DC071] font-semibold
    to bg-[#77D9AA] bg-opacity-50 bg-clip-text text-transparent text-6xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          VestVision;
        </span>

        <span className=" text-4xl sm:text-[44px] md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to bg-white bg-opacity-50">
          Where Each Dot
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-y-4">
        <p className="sm:flex text-center text-4xl sm:text-[44px] md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to bg-white bg-opacity-50">
          Has Its Own
        </p>
        <div className="text-center sm:min-w-[160px] md:min-w-[180px] lg:min-w-[210px] md:text-left">
          <FlipWords
            words={["Impact", "Dream", "Vision"]}
            className="text-slate-100 font-semibold sm:flex text-center text-4xl sm:text-[44px] md:text-5xl lg:text-6xl"
          />
        </div>
      </div>
      <Button
        title="Make Your Impact"
        btnType="button"
        handleClick={() => {}}
        styles=" border border-[#77D9AA] bg-black mt-16 md:mt-20 transitoin-all hover:bg-[#77D9AA] text-lg md:!text-xl"
      />
    </div>
  );
};

export default Hero;
