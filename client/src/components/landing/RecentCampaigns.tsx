"use client";

import { motion } from "framer-motion";
import { FundCard } from "./FundCard";
import { CampaignType, useStateContext } from "../../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../../assets";

const RecentCampaigns = () => {
  const { address, contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data.splice(0, 4));
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const navigate = useNavigate();

  const handleNavigate = (campaign: CampaignType) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className=" p-4 pt-0 mx-auto relative z-10  w-full">
      <div className="pb-8 text-4xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-[#1DC071] to-sky-200 bg-opacity-50">
        Graphic Design
      </div>

      <p className="mb-8 text-lg  text-neutral-300 max-w-lg text-center mx-auto font-semibold">
        We create stunning visuals for your brand. From logos to social media
        posts, we&apos;ve got you covered.
      </p>
      <div className="items-center md:flex justify-center md:mx-auto md:space-x-10">
        {isLoading && (
          <div className="w-full flex justify-center items-center min-h-[50vh]">
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
        )}
        {!isLoading && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex gap-5 flex-wrap justify-center max-w-[1024px]"
          >
            {campaigns.map((campaign) => (
              <FundCard campaign={campaign} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecentCampaigns;
