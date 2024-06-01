import { InfiniteCards } from "./InfiniteCards";

const LandingStats = () => {
  return (
    <div className="max-w-[1024px] flex flex-col sm:gap-4 md:gap-8 mx-auto border-b-8 border-l border-purple-500 rounded-bl-xl p-1 pb-4 sm:p-4 w-[90%] mt-32">
      <div className=" flex flex-col sm:flex-row gap-3 justify-center sm:justify-around bg-[#111]ounded-[8px] w-full ">
        <div className="flex flex-col items-center ">
          <h4 className="text-gray-200 text-2xl md:text-3xl font-semibold  ">
            4,8900+
          </h4>
          <p className="bg-clip-text text-transparent text-sm md:text-base font-bold bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
            Much better
          </p>
        </div>
        <div className="flex flex-col items-center ">
          <h4 className="text-gray-200 text-2xl md:text-3xl font-semibold  ">
            4,8900+
          </h4>
          <p className="bg-clip-text text-transparent text-sm md:text-base font-bold bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
            Much better
          </p>
        </div>
        <div className="flex flex-col items-center ">
          <h4 className="text-gray-200 text-2xl md:text-3xl font-semibold  ">
            4,8900+
          </h4>
          <p className="bg-clip-text text-transparent text-sm md:text-base font-bold bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
            Much better
          </p>
        </div>
      </div>
      <div className="flex flex-cl items-center">
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
  );
};

export default LandingStats;
