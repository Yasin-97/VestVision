import { CampaignTokenType } from "../context";

type TokenomicProps = {
  tokenData: CampaignTokenType;
};

const Tokenomic = ({ tokenData }: TokenomicProps) => {
  return (
    <div className=" rounded-[10px] min-h-[100px] flex w-full lg:w-[calc(100%-182px)] bg-[#1c1c24] gap-1 overflow-hidden">
      <span className="bg-[#28282e] relative w-16 h-15">
        <p className="flex justify-center items-center -rotate-90 absolute top-0 bottom-0 right-0 left-0 m-auto font-epilogue fount-medium text-[20px] leading-[30px] lg:text-center text-[#808191] ">
          Tokenomic
        </p>
      </span>
      <div className="w-full flex gap-3 lg:gap-4 p-4 lg:py-10 flex-wrap justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[#808191] text-[14px] leading-[22px] text-center">
              {tokenData?.name || "-"}
            </span>
            <span className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
              {tokenData?.symbol || "-"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#808191] text-[14px] leading-[22px] text-center">
              Total Supply
            </span>
            <span className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
              {tokenData?.initialSupply || "-"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[#808191] text-[14px] leading-[22px] text-center">
              Owner Share
            </span>
            <span className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
              {tokenData?.campaignOwnerShare || "-"} %
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#808191] text-[14px] leading-[22px] text-center">
              Team Share
            </span>
            <span className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
              {tokenData?.teamShare || "-"} %
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[#808191] text-[14px] leading-[22px] text-center">
              Advisor Share
            </span>
            <span className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
              {tokenData?.advisorShare || "-"} %
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#808191] text-[14px] leading-[22px] text-center">
              Public
            </span>
            <span className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">
              {tokenData?.publicShare || "-"} %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomic;
