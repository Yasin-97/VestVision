import { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import { BigNumber, ethers } from "ethers";
import { avatarColor } from "../utils";

export type CampaignType = {
  category: string;
  address?: string;
  title: string;
  description: string;
  target: string | BigNumber;
  deadline: string | BigNumber | number;
  image: string;
  amountCollected?: string;
  owner?: string;
};

export type CampaignTokenType = {
  campaignId?: number;
  name: string;
  symbol: string;
  totalSupply: number;
  campaignOwnerShare: number;
  teamAddress: string;
  teamShare: number;
  advisorAddress: string;
  advisorShare: number;
  earlyInvestorsAddress: string;
  earlyInvestorsShare: number;
  publicShare?: number;
};

export type CommentType = {
  owner: string;
  text: string;
  isInvestor: boolean;
  firstColor: string;
  secondColor: string;
  dir: string;
};

type contextType = {
  address?: string;
  connect: any;
  contract: any;
  createCampaign: (campaign: CampaignType) => Promise<void>;
  createTokenForCampaign: (campaignToken: CampaignTokenType) => Promise<void>;
  getUserCampaigns: () => Promise<CampaignType[]>;
  getCampaignTokenData: (pId: number) => Promise<CampaignTokenType | undefined>;
  getCampaigns: () => Promise<CampaignType[]>;
  invest: (pId: number, amount: string) => Promise<CampaignType>;
  getInvesments: (
    pId: number
  ) => Promise<{ investor: string; investment: string }[]>;
  addComment: (pId: number, text: string) => Promise<void>;
  likeCampaign: (pId: number) => Promise<void>;
  getComments: (pId: number) => Promise<CommentType[]>;
  getNumberOfLikes: (pId: number) => Promise<string>;
};
type StateContextProviderType = { children: ReactNode };

const StateContext = createContext<contextType>({
  address: "",
  connect: null,
  contract: null,
  createCampaign: async () => {
    throw new Error("createCampaign function not implemented");
  },
  createTokenForCampaign: async () => {
    throw new Error("createTokenForCampaign function not implemented");
  },
  getUserCampaigns: async () => {
    throw new Error("getUserCampaigns function not implemented");
  },
  getCampaignTokenData: async () => {
    throw new Error("getCampaignTokenData function not implemented");
  },
  getCampaigns: async () => {
    throw new Error("getCampaign function not implemented");
  },
  invest: async (pId, amount) => {
    throw new Error("invest function not implemented");
  },
  getInvesments: async (pId) => {
    throw new Error("getInvesments function not implemented");
  },
  addComment: async (pId, text) => {
    throw new Error("addComment function not implemented");
  },
  likeCampaign: async (pId) => {
    throw new Error("likeCampaign function not implemented");
  },
  getComments: async (pId) => {
    throw new Error("getComments function not implemented");
  },
  getNumberOfLikes: async (pId) => {
    throw new Error("getNumberOfLikes function not implemented");
  },
});
export const StateContextProvider = ({
  children,
}: StateContextProviderType) => {
  const { contract } = useContract(
    "0x3A98B7FFaBF592be494603328EEc6290e3b12cB5"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const { mutateAsync: createTokenForCampaign } = useContractWrite(
    contract,
    "createTokenForCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (campaign: CampaignType) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          campaign.title,
          campaign.category,
          campaign.description,
          campaign.target,
          new Date(campaign.deadline as string).getTime(),
          campaign.image,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const mintTokenForCampaign = async (campaignToken: CampaignTokenType) => {
    try {
      const data = await createTokenForCampaign({
        args: [
          campaignToken.campaignId,
          campaignToken.name,
          campaignToken.symbol,
          campaignToken.totalSupply,
          campaignToken.campaignOwnerShare,
          campaignToken.teamAddress,
          campaignToken.teamShare,
          campaignToken.advisorAddress,
          campaignToken.advisorShare,
          campaignToken.earlyInvestorsAddress,
          campaignToken.earlyInvestorsShare,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const addComment = async (pId: number, text: string) => {
    try {
      const data = await contract?.call("addComment", [pId, text]);
      console.log("contract call success", data);
      return data;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const likeCampaign = async (pId: number) => {
    try {
      console.log("the campaign id", pId);

      const data = await contract?.call("likeCampaign", [pId]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns: CampaignType[] = await contract?.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      category: campaign.category,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: (campaign.deadline as BigNumber).toNumber(),
      amountCollected: ethers.utils.formatEther(
        (campaign.amountCollected as string).toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getComments = async (pId: number) => {
    const allComments: { owner: string; text: string }[] = await contract?.call(
      "getAllComments",
      [pId]
    );
    const allinvestments = await getInvesments(pId);

    const cleanComments = allComments.map((item) => {
      const { firstColor, secondColor, dir } = avatarColor();

      const isInvestor = allinvestments.find(
        (investment) => investment.investor === item.owner
      );

      return {
        isInvestor: !!isInvestor,
        firstColor,
        secondColor,
        dir,
        owner: item.owner,
        text: item.text,
      };
    });

    return cleanComments;
  };

  const getNumberOfLikes = async (pId: number) => {
    const likesCount = await contract?.call("getNumberOfLikes", [pId]);
    return likesCount._hex;
  };

  const invest = async (pId: number, amount: string) => {
    const data = await contract?.call("investInCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getInvesments = async (pId: number) => {
    const investments = await contract?.call("getInvestors", [pId]);
    const numberOfInvestments = investments[0].length;

    const parsedInvestments: { investor: string; investment: string }[] = [];

    for (let i = 0; i < numberOfInvestments; i++) {
      parsedInvestments.push({
        investor: investments[0][i],
        investment: ethers.utils.formatEther(investments[1][i].toString()),
      });
    }

    return parsedInvestments;
  };

  const getCampaignTokenData = async (pId: number) => {
    try {
      const rawTokenData = await contract?.call("getCampaignTokenData", [pId]);

      const parsedTokenData: CampaignTokenType = {
        name: rawTokenData?.name,
        symbol: rawTokenData?.symbol,
        totalSupply: parseInt(rawTokenData?.totalSupply._hex, 16),
        campaignOwnerShare: parseInt(rawTokenData?.campaignOwnerShare._hex, 16),
        teamAddress: rawTokenData?.teamAddress,
        teamShare: parseInt(rawTokenData?.teamShare._hex, 16),
        advisorAddress: rawTokenData?.advisorAddress,
        advisorShare: parseInt(rawTokenData?.advisorShare._hex, 16),
        earlyInvestorsAddress: rawTokenData?.earlyInvestorsAddress,
        earlyInvestorsShare: parseInt(
          rawTokenData?.earlyInvestorsShare._hex,
          16
        ),
      };

      return parsedTokenData;
    } catch (error) {
      if (error.message.includes("call revert exception")) {
        console.log("This campaign does not have its own token!");
      }
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  return (
    <StateContext.Provider
      value={{
        invest,
        connect,
        address,
        contract,
        addComment,
        getComments,
        getCampaigns,
        likeCampaign,
        getInvesments,
        getUserCampaigns,
        getNumberOfLikes,
        getCampaignTokenData,
        createCampaign: publishCampaign,
        createTokenForCampaign: mintTokenForCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
