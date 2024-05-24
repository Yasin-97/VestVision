import React, {
  useState,
  useEffect,
  MouseEvent,
  MouseEventHandler,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CampaignTokenType, useStateContext } from "../context";
import { CountBox, Button, Loader, Comments } from "../components";
import { avatarColor, calculateBarPercentage, daysLeft } from "../utils";
import defaultImg from "../../public/images/templates-preview.png";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import confetti from "canvas-confetti";
import Tokenomic from "../components/Tokenomic";

const { firstColor, secondColor, dir } = avatarColor();

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { invest, getInvesments, getCampaignTokenData, contract, address } =
    useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [tokenData, setTokenData] = useState<CampaignTokenType>();
  const [investors, setInvestors] = useState<
    { investor: string; investment: string }[]
  >([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const remainingDays = daysLeft(state?.deadline);

  const fetchInvestors = async () => {
    const data = await getInvesments(state.pId);

    setInvestors(data);
  };

  const fetchTokenData = async () => {
    const data = await getCampaignTokenData(state.pId);
    if (data)
      setTokenData({
        ...data,
        publicShare:
          100 -
          (data.advisorShare +
            data.teamShare +
            data.reserveShare +
            data.campaignOwnerShare),
      });
  };

  useEffect(() => {
    if (contract) {
      fetchTokenData();
      fetchInvestors();
    }
  }, [contract, address]);

  const handleConfetti: MouseEventHandler<SVGElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.right) / 2 / window.innerWidth,
      y: (rect.top + rect.bottom) / 2 / window.innerHeight,
    };

    confetti({
      particleCount: 20,
      spread: 20,
      origin: origin,
      startVelocity: 20,
      zIndex: 999,
    });
    setIsLiked(true);
  };

  const handleInvestment = async () => {
    if (!address) return alert("Please connect your Metamask wallet.");
    try {
      setIsLoading(true);

      await invest(state.pId, amount);

      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex  flex-col mt-10 gap-8">
        <div className="w-full flex md:flex-row flex-col gap-8">
          <div className="flex-1 flex-col relative">
            <img
              src={state?.image || defaultImg}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl "
            />
            <div className=" p-2 flex gap-1 items-center absolute bottom-5 left-2 bg-[#13131a] rounded-xl">
              <MdVerifiedUser className="text-green-400 text-2xl" />
              <span className=" font-bold text-green-100">VERIFIED</span>
            </div>
            <div className=" p-2 flex flex-col gap-1 items-center absolute bottom-5 right-2 bg-[#13131a] rounded-xl cursor-pointer">
              <BiSolidLike
                onClick={handleConfetti}
                className={`text-3xl text-white transition-all hover:text-green-400 ${
                  isLiked && "!text-green-400"
                }`}
              />
              <span className="text-white ">15</span>
            </div>
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    state?.target,
                    state?.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="flex md:w-[150px] w-full flex-wrap justify-center gap-8 ">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox
              title={`Raised of ${state?.target}`}
              value={state?.amountCollected}
            />
            <CountBox title="Total Backers" value={investors.length} />
          </div>
        </div>
        <Tokenomic tokenData={tokenData as CampaignTokenType} />
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div
                style={{
                  background: `linear-gradient(to ${dir}, ${firstColor}, ${secondColor})`,
                }}
                className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer"
              ></div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state?.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state?.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              investors
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {investors.length > 0 ? (
                investors.map((item, index) => (
                  <div
                    key={`${item.investor}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item.investor}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.investment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No investors yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" flex-1 mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] lg:text-center text-[#808191]">
            Fund the campaign
          </p>
          <div className="mt-[30px]">
            <input
              type="number"
              placeholder="ETH 0.1"
              step="0.01"
              className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Back it because you believe in it.
              </h4>
              <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                Support the project for no reward, just because it speaks to
                you.
              </p>
            </div>

            <Button
              btnType="button"
              title="Fund Campaign"
              styles="w-full bg-[#8c6dfd]"
              handleClick={handleInvestment}
            />
          </div>
        </div>
      </div>
      <Comments campaignId={state?.pId} />
    </div>
  );
};

export default CampaignDetails;
