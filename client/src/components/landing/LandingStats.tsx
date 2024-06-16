import { loader } from "../../assets";
import { InvestmentSummaryType, useStateContext } from "../../context";
import { InfiniteCards } from "./InfiniteCards";
import React, { useState, useEffect } from "react";

const LandingStats = () => {
  const { address, contract, getInvestmentSummary } = useStateContext();

  const [investmentSummary, setInvestmentSummary] =
    useState<InvestmentSummaryType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchInvestmentSummary = async () => {
    setIsLoading(true);

    const data = await getInvestmentSummary();

    setIsLoading(false);
    setInvestmentSummary(data);
  };
  console.log("logger", investmentSummary?.amountOfInvestments!);

  useEffect(() => {
    fetchInvestmentSummary();
  }, [address, contract]);
  if (!investmentSummary)
    return (
      <div className="w-full flex justify-center items-center min-h-[50vh]">
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
      </div>
    );
  return (
    <div className="max-w-[1024px] flex flex-col sm:gap-4 md:gap-8 mx-auto border-b-8 border-l border-purple-500 rounded-bl-xl p-1 pb-4 sm:p-4 w-[90%] mt-32">
      <div className=" flex flex-col sm:flex-row gap-3 justify-center sm:justify-around bg-[#111]ounded-[8px] w-full ">
        <div className="flex flex-col items-center ">
          <h4 className="text-gray-200 text-2xl md:text-3xl font-semibold  ">
            {investmentSummary?.numberOfInvestors}
          </h4>
          <p className="bg-clip-text text-transparent text-sm md:text-base font-bold bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
            # of Investors
          </p>
        </div>
        <div className="flex flex-col items-center ">
          <h4 className="text-gray-200 text-2xl md:text-3xl font-semibold  ">
            {investmentSummary?.amountOfInvestments}{" "}
            <sapn className="text-base">ETH</sapn>
          </h4>
          <p className="bg-clip-text text-transparent text-sm md:text-base font-bold bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
            Invested In Projects
          </p>
        </div>
        <div className="flex flex-col items-center ">
          <h4 className="text-gray-200 text-2xl md:text-3xl font-semibold  ">
            {investmentSummary?.numberOfProjects}
          </h4>
          <p className="bg-clip-text text-transparent text-sm md:text-base font-bold bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
            Projects
          </p>
        </div>
      </div>
      <div className="flex flex-cl items-center">
        <InfiniteCards
          speed="slow"
          className="flex-1"
          items={investmentSummary?.recentInvestments}
        />
      </div>
    </div>
  );
};

export default LandingStats;
