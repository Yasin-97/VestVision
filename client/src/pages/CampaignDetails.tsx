import React, {
  useState,
  useEffect,
  MouseEvent,
  MouseEventHandler,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CampaignTokenType, useStateContext } from "../context";
import { CountBox, Button, Loader, Comments } from "../components";
import { avatarColor, calculateBarPercentage, daysLeft } from "../lib/utils";
import defaultImg from "../../public/images/templates-preview.png";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import confetti from "canvas-confetti";
import Tokenomic from "../components/dashboard/Tokenomic";
import { SiEthereum } from "react-icons/si";
const { firstColor, secondColor, dir } = avatarColor();

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    getNumberOfLikes,
    invest,
    getInvesments,
    getCampaignTokenData,
    contract,
    address,
    likeCampaign,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState({
    investment: false,
    likeCount: true,
    tokenData: true,
    investors: true,
  });
  const [amount, setAmount] = useState("");
  const [tokenData, setTokenData] = useState<CampaignTokenType>();
  const [investors, setInvestors] = useState<
    { investor: string; investment: string }[]
  >([]);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const remainingDays = daysLeft(state?.deadline);

  const fetchInvestors = async () => {
    setIsLoading({ ...isLoading, investors: true });

    const data = await getInvesments(state.pId);
    setIsLoading({ ...isLoading, investors: false });

    setInvestors(data);
  };

  const fetchTokenData = async () => {
    setIsLoading({ ...isLoading, tokenData: true });

    const data = await getCampaignTokenData(state.pId);

    if (data) setTokenData(data);

    setIsLoading({ ...isLoading, tokenData: false });
  };
  const likeCampaignHandler = async () => {
    await likeCampaign(state.pId);
    await fetchLikesCount();
  };

  const fetchLikesCount = async () => {
    try {
      setIsLoading({ ...isLoading, likeCount: true });
      const likesCount = await getNumberOfLikes(state.pId);
      setIsLoading({ ...isLoading, likeCount: false });

      setLikesCount(parseInt(likesCount));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchTokenData();
    }
  }, [contract, address]);
  useEffect(() => {
    if (contract) {
      fetchInvestors();
    }
  }, [contract, address]);
  useEffect(() => {
    if (contract) {
      fetchTokenData();
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
      setIsLoading({ ...isLoading, investment: true });

      await invest(state.pId, amount);

      navigate("/");
      setIsLoading({ ...isLoading, investment: false });
    } catch (error) {
      setIsLoading({ ...isLoading, investment: false });
    }
  };

  return (
    <div>
      {isLoading.investment && <Loader />}

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
                onClick={(e) => {
                  handleConfetti(e);
                  likeCampaignHandler();
                }}
                className={`text-3xl text-white transition-all hover:text-green-400 ${
                  isLiked && "!text-green-400"
                }`}
              />
              <span className="text-white ">{likesCount}</span>
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
              title={`Raised of ${state?.target} `}
              value={state?.amountCollected}
            />
            <CountBox title="Total Backers" value={investors.length} />
          </div>
        </div>
        <Tokenomic
          isLoading={isLoading.tokenData}
          tokenData={tokenData as CampaignTokenType}
        />
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#808191] uppercase">
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
            <h4 className="font-epilogue font-semibold text-[18px] text-[#808191] uppercase">
              White Paper
            </h4>

            <div className="mt-[20px]">
              <p
                className="rich-text font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                dangerouslySetInnerHTML={{ __html: state?.description }}
              />
            </div>
          </div>
        </div>
        <div className="gap-10 self-start flex-1 mt-[20px] md:mt-0 flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
          <div>
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
                  Invest in Tomorrow’s Innovations.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Join the movement that fuels groundbreaking startups. Your
                  investment today shapes the tech landscape of tomorrow.
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
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#808191] uppercase">
              recent investors
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {investors.length > 0 ? (
                investors.map((item, index) => {
                  const { dir, firstColor, secondColor } = avatarColor();
                  return (
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex gap-2">
                        <span
                          style={{
                            background: `linear-gradient(to ${dir}, ${firstColor}, ${secondColor})`,
                          }}
                          className="h-8 w-8 rounded-full"
                        />
                        <p className="font-semibold font-epilogue text-[14px] text-white leading-[26px] break-ll">
                          {item.investor}
                        </p>
                      </div>
                      <p className=" font-semibold font-epilogue text-[16px] text-white leading-[26px] break-ll">
                        {item.investment}{" "}
                        <SiEthereum className="text-base font-thin text-[#ffd900bb] inline" />
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No investors yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Comments campaignId={state?.pId} />
    </div>
  );
};

export default CampaignDetails;
