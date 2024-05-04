import { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  MetaMaskWallet,
} from "@thirdweb-dev/react";

import { BigNumber, ethers } from "ethers";
import { avatarColor } from "../utils";

export type CampaignType = {
  address?: string;
  title: string;
  description: string;
  target: string | BigNumber;
  deadline: string | BigNumber | number;
  image: string;
  amountCollected?: string;
  owner?: string;
};

type contextType = {
  address?: string;
  connect: any;
  contract: any;
  createCampaign: (campaign: CampaignType) => Promise<void>;
  getUserCampaigns: () => Promise<CampaignType[]>;
  getCampaigns: () => Promise<CampaignType[]>;
  donate: (pId: string, amount: string) => Promise<CampaignType>;
  getDonations: (
    pId: string
  ) => Promise<{ donator: number; donation: string }[]>;
  addComment: (pId: number, text: string) => Promise<void>;
  getComments: (pId: number) => Promise<{ owner: string; text: string }[]>;
};
type StateContextProviderType = { children: ReactNode };

const StateContext = createContext<contextType>({
  address: "",
  connect: null,
  contract: null,
  createCampaign: async () => {
    throw new Error("createCampaign function not implemented");
  },
  getUserCampaigns: async () => {
    throw new Error("getUserCampaigns function not implemented");
  },
  getCampaigns: async () => {
    throw new Error("getCampaign function not implemented");
  },
  donate: async (pId, amount) => {
    throw new Error("donate function not implemented");
  },
  getDonations: async (pId) => {
    throw new Error("getDonations function not implemented");
  },
  addComment: async (pId, text) => {
    throw new Error("addComment function not implemented");
  },
  getComments: async (pId) => {
    throw new Error("getComments function not implemented");
  },
});
export const StateContextProvider = ({
  children,
}: StateContextProviderType) => {
  const { contract } = useContract(
    "0x3a3b32c99e42B3c8888385894131af82a389A4f3"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (campaign: CampaignType) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          campaign.title,
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

  const addComment = async (pId: number, text: string) => {
    try {
      console.log("runing");
      const data = await contract?.call("addComment", [pId, text]);

      console.log("contract call success", data);
      return data;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns: CampaignType[] = await contract?.call("getCampaign");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
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
    const cleanComments = allComments.map((item) => {
      const { firstColor, secondColor, dir } = avatarColor();

      return {
        firstColor,
        secondColor,
        dir,
        owner: item.owner,
        text: item.text,
      };
    });

    return cleanComments;
  };

  const donate = async (pId: string, amount: string) => {
    const data = await contract?.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId: string) => {
    const donations = await contract?.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations: { donator: number; donation: string }[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
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
        address,
        donate,
        connect,
        contract,
        getCampaigns,
        addComment,
        getComments,
        getDonations,
        getUserCampaigns,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
