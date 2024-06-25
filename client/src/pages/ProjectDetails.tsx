import React, {
  useState,
  useEffect,
  MouseEvent,
  MouseEventHandler,
  useMemo,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ProjectTokenType, useStateContext } from "../context";
import { CountBox, Button, Loader, Comments } from "../components";
import {
  avatarColor,
  calculateBarPercentage,
  daysLeft,
  shortenAddress,
} from "../lib/utils";
import defaultImg from "../../public/images/templates-preview.png";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import confetti from "canvas-confetti";
import Tokenomic from "../components/dashboard/Tokenomic";
import { SiEthereum } from "react-icons/si";
import { loader } from "../assets";
const { firstColor, secondColor, dir } = avatarColor();

const ProjectDetails = () => {
  const { projectId } = useParams();

  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    getNumberOfLikes,
    invest,
    getInvestors,
    getProjectTokenData,
    getSingleProject,
    contract,
    address,
    likeProject,
  } = useStateContext();
  const [projectDetail, setProjectDetail] = useState(state);

  const [isInvestorLoading, setIsInvestorLoading] = useState(false);
  const [isTokenDataLoading, setIsTokenDataLoading] = useState(false);
  const [isProjectDetailLoading, setIsProjectDetailLoading] = useState(false);
  const [isInvestmentLoading, setIsInvestmentLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [tokenData, setTokenData] = useState<ProjectTokenType>();
  const [investors, setInvestors] = useState<
    { investor: string; investment: string }[]
  >([]);
  const [likesCount, setLikesCount] = useState<string>("0");
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const investorsAvattar = useMemo(() => {
    const investorsLength = new Array(investors.length).length;
    let avatars: {
      firstColor: string;
      secondColor: string;
      dir: string;
    }[] = [];
    for (let i = 0; i < investorsLength; i++) {
      avatars = [...avatars, avatarColor()];
    }
    return avatars;
  }, [investors.length]);

  const remainingDays = daysLeft(projectDetail?.deadline);

  const fetchInvestors = async () => {
    try {
      setIsInvestorLoading(true);

      const data = await getInvestors(projectId as string);
      setIsInvestorLoading(false);

      setInvestors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTokenData = async () => {
    try {
      setIsTokenDataLoading(true);

      const data = await getProjectTokenData(projectId as string);

      if (data) setTokenData(data);

      setIsTokenDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const likeProjectHandler = async () => {
    try {
      await likeProject(projectId as string);
      await fetchLikesCount();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLikesCount = async () => {
    try {
      const likesCount = await getNumberOfLikes(projectId as string);

      setLikesCount(likesCount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjectDetail = async () => {
    try {
      setIsProjectDetailLoading(true);
      const project = await getSingleProject(projectId as string);
      setIsProjectDetailLoading(false);
      setProjectDetail(project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!state) fetchProjectDetail();
  }, [state]);

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

  useEffect(() => {
    if (contract) {
      fetchLikesCount();
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
      setIsInvestmentLoading(true);

      await invest(projectDetail.pId, amount);
      setAmount("");
      await fetchInvestors();
      setIsInvestmentLoading(false);
    } catch (error) {
      setIsInvestmentLoading(false);
    }
  };

  return (
    <div>
      {isInvestmentLoading && <Loader />}

      <div className="w-full flex  flex-col mt-10 gap-8">
        <div className="w-full flex md:flex-row flex-col gap-8">
          <div className="flex-1 flex-col relative">
            <img
              src={projectDetail?.image || defaultImg}
              alt="project"
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
                  likeProjectHandler();
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
                    projectDetail?.target,
                    projectDetail?.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="flex md:w-[150px] w-full flex-wrap justify-center gap-8 ">
            <CountBox title="Days Left" value={remainingDays || "-"} />
            <CountBox
              title={`Raised of ${projectDetail?.target || "-"} `}
              value={projectDetail?.amountCollected || "-"}
            />
            <CountBox title="Total Backers" value={investors.length || "-"} />
          </div>
        </div>
        <Tokenomic
          isLoading={isTokenDataLoading}
          tokenData={tokenData as ProjectTokenType}
        />
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        {isTokenDataLoading && (
          <div className="flex-[2]">
            <div className="w-full flex justify-center items-center mt-4 h-full">
              <img
                src={loader}
                alt="loader"
                className="w-[100px] h-[100px] object-contain"
              />
            </div>
          </div>
        )}

        {!isTokenDataLoading && (
          <div className="flex-[2] flex flex-col gap-[40px]">
            <h1 className="font-bold text-[25px] leading-10 text-white border-l-8 border-[#1DC071] pl-5">
              {projectDetail?.title}
            </h1>
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
                  <h4 className="font-epilogue font-semibold text-[16px] text-white break-all">
                    {projectDetail?.ownerName}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-semibold text-[12px] text-[#808191]">
                    {projectDetail?.owner}
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
                  dangerouslySetInnerHTML={{
                    __html: projectDetail?.description,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="gap-10 self-start flex-1 mt-[20px] md:mt-0 flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
          <div>
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] lg:text-center text-[#808191]">
              Fund the project
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
                title="Fund Project"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleInvestment}
              />
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#808191] uppercase">
              recent investors
            </h4>
            {isInvestorLoading && (
              <div className="w-full flex justify-center items-center mt-4">
                <img
                  src={loader}
                  alt="loader"
                  className="w-[40px] h-[40px] object-contain"
                />
              </div>
            )}
            <div className="mt-[16px] flex flex-col gap-4">
              {!isInvestorLoading &&
                investors.length > 0 &&
                investors.map((item, i) => {
                  return (
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex gap-2 items-center">
                        <span
                          style={{
                            background: `linear-gradient(to ${investorsAvattar?.[i]?.dir}, ${investorsAvattar?.[i]?.firstColor}, ${investorsAvattar?.[i]?.secondColor})`,
                          }}
                          className="h-8 w-8 rounded-full"
                        />
                        <p className="font-semibold font-epilogue text-[14px] text-white leading-[26px] break-ll">
                          {shortenAddress(item.investor)}
                        </p>
                      </div>
                      <p className=" font-semibold font-epilogue text-[14px] text-white leading-[26px] break-ll">
                        {item.investment}{" "}
                        <SiEthereum className="text-base font-thin text-[#ffd900bb] inline" />
                      </p>
                    </div>
                  );
                })}
              {!isInvestorLoading && !investors.length && (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No investors yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Comments projectId={projectId as string} />
    </div>
  );
};

export default ProjectDetails;
