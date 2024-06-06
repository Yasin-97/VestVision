import { useContext, createContext, ReactNode } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

import { BigNumber, ethers } from "ethers";
import { avatarColor } from "../lib/utils";

export type ProjectType = {
  category: string;
  address?: string;
  title: string;
  description: string;
  target: string | BigNumber;
  deadline: string | BigNumber | number;
  image: string;
  amountCollected?: string;
  owner?: string;
  pId: number;
};

export type ProjectTokenType = {
  projectId?: number;
  name: string;
  symbol: string;
  totalSupply: number;
  projectOwnerShare: number;
  teamAddress: string;
  teamShare: number;
  advisorAddress: string;
  advisorShare: number;
  earlyInvestorsAddress: string;
  earlyInvestorsShare: number;
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
  createProject: (project: ProjectType) => Promise<void>;
  createTokenForProject: (projectToken: ProjectTokenType) => Promise<void>;
  getUserProjects: () => Promise<ProjectType[]>;
  getProjectTokenData: (pId: number) => Promise<ProjectTokenType | undefined>;
  getProjects: () => Promise<ProjectType[]>;
  invest: (pId: number, amount: string) => Promise<ProjectType>;
  getInvesments: (
    pId: number
  ) => Promise<{ investor: string; investment: string }[]>;
  addComment: (pId: number, text: string) => Promise<void>;
  likeProject: (pId: number) => Promise<void>;
  getComments: (pId: number) => Promise<CommentType[]>;
  getNumberOfLikes: (pId: number) => Promise<string>;
  getInvestmentSummary: () => Promise<string>;
};
type StateContextProviderType = { children: ReactNode };

const StateContext = createContext<contextType>({
  address: "",
  connect: null,
  contract: null,
  createProject: async () => {
    throw new Error("createProject function not implemented");
  },
  createTokenForProject: async () => {
    throw new Error("createTokenForProject function not implemented");
  },
  getUserProjects: async () => {
    throw new Error("getUserProjects function not implemented");
  },
  getProjectTokenData: async () => {
    throw new Error("getProjectTokenData function not implemented");
  },
  getProjects: async () => {
    throw new Error("getProject function not implemented");
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
  likeProject: async (pId) => {
    throw new Error("likeProject function not implemented");
  },
  getComments: async (pId) => {
    throw new Error("getComments function not implemented");
  },
  getNumberOfLikes: async (pId) => {
    throw new Error("getNumberOfLikes function not implemented");
  },
  getInvestmentSummary: async () => {
    throw new Error("getInvestmentSummary function not implemented");
  },
});
export const StateContextProvider = ({
  children,
}: StateContextProviderType) => {
  const { contract } = useContract(
    "0x2975B01B19604fCAf76aC5f8ccDB69A9b7b6877e"
  );

  const { mutateAsync: createProject } = useContractWrite(
    contract,
    "createProject"
  );
  const { mutateAsync: createTokenForProject } = useContractWrite(
    contract,
    "createTokenForProject"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishProject = async (project: ProjectType) => {
    try {
      const data = await createProject({
        args: [
          address,
          project.title,
          project.category,
          project.description,
          project.target,
          new Date(project.deadline as string).getTime(),
          project.image,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const mintTokenForProject = async (projectToken: ProjectTokenType) => {
    try {
      const data = await createTokenForProject({
        args: [
          projectToken.projectId,
          projectToken.name,
          projectToken.symbol,
          projectToken.totalSupply,
          projectToken.projectOwnerShare,
          projectToken.teamAddress,
          projectToken.teamShare,
          projectToken.advisorAddress,
          projectToken.advisorShare,
          projectToken.earlyInvestorsAddress,
          projectToken.earlyInvestorsShare,
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const invest = async (pId: number, amount: string) => {
    const data = await contract?.call("investInProject", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
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

  const likeProject = async (pId: number) => {
    try {
      const data = await contract?.call("likeProject", [pId]);
      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getProjects = async () => {
    const projects: ProjectType[] = await contract?.call("getProjects");

    const parsedCampaings = projects.map((project, i) => ({
      owner: project.owner,
      title: project.title,
      category: project.category,
      description: project.description,
      target: ethers.utils.formatEther(project.target.toString()),
      deadline: (project.deadline as BigNumber).toNumber(),
      amountCollected: ethers.utils.formatEther(
        (project.amountCollected as string).toString()
      ),
      image: project.image,
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

  const getInvestmentSummary = async () => {
    const investmentSummary = await contract?.call("getInvestmentSummary");
    console.log("the data is here", investmentSummary);
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

  const getProjectTokenData = async (pId: number) => {
    try {
      const rawTokenData = await contract?.call("getProjectTokenData", [pId]);

      const parsedTokenData: ProjectTokenType = {
        name: rawTokenData?.name,
        symbol: rawTokenData?.symbol,
        totalSupply: parseInt(rawTokenData?.totalSupply._hex, 16),
        projectOwnerShare: parseInt(rawTokenData?.projectOwnerShare._hex, 16),
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
        console.log("This project does not have its own token!");
      }
    }
  };

  const getUserProjects = async () => {
    const allProjects = await getProjects();
    const filteredProjects = allProjects.filter(
      (project) => project.owner === address
    );

    return filteredProjects;
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
        getProjects,
        likeProject,
        getInvesments,
        getUserProjects,
        getNumberOfLikes,
        getInvestmentSummary,
        getProjectTokenData,
        createProject: publishProject,
        createTokenForProject: mintTokenForProject,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
