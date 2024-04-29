import { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  MetaMaskWallet,
} from "@thirdweb-dev/react";

import { BigNumber, ethers } from "ethers";

export type CampaignType = {
  address?: string;
  title: string;
  description: string;
  target: string | BigNumber;
  deadline: string;
  image: string;
};
type contextType = {
  address?: string;
  connect: any;
  contract: any;
  createCampaign: (campaign: CampaignType) => Promise<void>;
};
type StateContextProviderType = { children: ReactNode };

const StateContext = createContext<contextType>({
  address: "",
  connect: null,
  contract: null,
  createCampaign: async () => {
    throw new Error("createCampaign function not implemented");
  },
});
export const StateContextProvider = ({
  children,
}: StateContextProviderType) => {
  const { contract } = useContract(
    "0x60863289eff3cea553db1b72cf133ba9f5a6c451"
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
          new Date(campaign.deadline).getTime(),
          campaign.image,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  return (
    <StateContext.Provider
      value={{ address, connect, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
