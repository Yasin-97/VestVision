import { useContext, createContext, ReactNode, useState } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { toast } from "react-toastify";

import { BigNumber, ethers } from "ethers";
import { avatarColor, paddNumber } from "../lib/utils";

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
  ownerName?: string;
  pId?: number;
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
export type recentInvestmentsType = {
  amount: string;
  title: string;
  investor: string;
};
export type InvestmentSummaryType = {
  amountOfInvestments: string;
  numberOfInvestors: number;
  numberOfProjects: number;
  recentInvestments: recentInvestmentsType[];
};

export type contextType = {
  address?: string;
  searchquery: string;
  connect: any;
  contract: any;
  handleSearchChange: (query: string) => void;
  createProject: (project: ProjectType) => Promise<void>;
  createTokenForProject: (projectToken: ProjectTokenType) => Promise<void>;
  invest: (pId: string, amount: string) => Promise<ProjectType>;
  addComment: (pId: string, text: string) => Promise<void>;
  likeProject: (pId: string) => Promise<void>;
  getUserProjects: () => Promise<ProjectType[] | undefined>;
  getProjectTokenData: (pId: string) => Promise<ProjectTokenType | undefined>;
  getProjects: () => Promise<ProjectType[] | undefined>;
  getSingleProject: (pId: string) => Promise<ProjectType | undefined>;
  getInvestors: (
    pId: string
  ) => Promise<{ investor: string; investment: string }[] | undefined>;
  getComments: (pId: string) => Promise<CommentType[] | undefined>;
  getNumberOfLikes: (pId: string) => Promise<number | undefined>;
  getInvestmentSummary: () => Promise<InvestmentSummaryType | undefined>;
};
export type StateContextProviderType = { children: ReactNode };
const StateContext = createContext<contextType>({
  address: "",
  searchquery: "",
  connect: null,
  contract: null,
  handleSearchChange: (query) => {
    throw new Error("handleSearchChange function not implemented");
  },
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
  getInvestors: async (pId) => {
    throw new Error("getInvestors function not implemented");
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
  getSingleProject: async (pId) => {
    throw new Error("getSingleProject function not implemented");
  },
});

const throwToast = (error: any) => {
  if (error.message.includes("user rejected transaction")) {
    toast.error("user rejected transaction");
  }
};
export const StateContextProvider = ({
  children,
}: StateContextProviderType) => {
  const [searchquery, setSearchquery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchquery(query);
  };

  const { contract } = useContract(
    "0x00E31eA124d5476308fe02fA66c8d14E7034e73d"
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
          project.ownerName,
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
      throwToast(error);
      throw new Error(`contract call failure: ${error}`);
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
      throwToast(error);
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const invest = async (pId: string, amount: string) => {
    try {
      const data = await contract?.call("investInProject", [pId], {
        value: ethers.utils.parseEther(amount),
      });

      return data;
    } catch (error) {
      throwToast(error);
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const addComment = async (pId: string, text: string) => {
    try {
      const data = await contract?.call("addComment", [pId, text]);
      console.log("contract call success", data);
      return data;
    } catch (error) {
      throwToast(error);
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const likeProject = async (pId: string) => {
    try {
      const data = await contract?.call("likeProject", [pId]);
      console.log("contract call success", data);
    } catch (error) {
      throwToast(error);
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const getProjects = async () => {
    try {
      const projects: ProjectType[] = await contract?.call("getProjects");
      const parsedProjects = projects.map((project, i) => ({
        owner: project.owner,
        ownerName: project.ownerName,
        title: project.title,
        category: project.category,
        description: project.description,
        target: ethers.utils.formatEther(project.target.toString()),
        deadline: paddNumber((project.deadline as BigNumber).toNumber()),
        amountCollected: ethers.utils.formatEther(
          (project.amountCollected as string).toString()
        ),
        image: project.image,
        pId: i,
      }));

      return parsedProjects;
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const getSingleProject = async (pId: string) => {
    try {
      const project = await contract?.call("getSingleProject", [pId]);
      console.log("the project", project);

      if (project) {
        const parsedProject = {
          owner: project.owner,
          ownerName: project.ownerName,
          title: project.title,
          category: project.category,
          description: project.description,
          target: ethers.utils.formatEther(project.target.toString()),
          deadline: (project.deadline as BigNumber).toNumber(),
          amountCollected: ethers.utils.formatEther(
            (project.amountCollected as string).toString()
          ),
          image: project.image,
        };

        return parsedProject;
      }
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };
  const getComments = async (pId: string) => {
    try {
      const allComments: { owner: string; text: string }[] =
        await contract?.call("getProjectComments", [pId]);
      const allinvestments = await getInvestors(pId);

      const cleanComments = allComments?.map((item) => {
        const { firstColor, secondColor, dir } = avatarColor();

        const isInvestor = allinvestments?.find(
          (investment) => investment.investor === item.owner
        );

        return {
          owner: item.owner,
          text: item.text,
          isInvestor: !!isInvestor,
          firstColor,
          secondColor,
          dir,
        };
      });

      return cleanComments as CommentType[];
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const getNumberOfLikes = async (pId: string) => {
    try {
      const likesCount = await contract?.call("getNumberOfLikes", [pId]);

      return parseInt(likesCount._hex);
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const getInvestors = async (pId: string) => {
    try {
      const investments = await contract?.call("getInvestors", [pId]);
      const numberOfInvestments = investments?.[0].length;

      const parsedInvestments: { investor: string; investment: string }[] = [];

      for (let i = 0; i < numberOfInvestments; i++) {
        parsedInvestments.push({
          investor: investments[0][i],
          investment: ethers.utils.formatEther(investments[1][i].toString()),
        });
      }

      return parsedInvestments;
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const getProjectTokenData = async (pId: string) => {
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
    } catch (error: any) {
      if (error.message.includes("call revert exception")) {
        console.log("This project does not have its own token!");
      }
    }
  };

  const getUserProjects = async () => {
    try {
      const allProjects = await getProjects();
      const filteredProjects = allProjects?.filter(
        (project) => project.owner === address
      );

      return filteredProjects;
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };

  const getInvestmentSummary = async () => {
    try {
      const investmentSummary = await contract?.call("getInvestmentSummary");
      if (investmentSummary) {
        const parsedInvestments = investmentSummary[3].map(
          (investment: any) => ({
            amount: ethers.utils.formatEther(investment.amount._hex),
            title: investment.title,
            investor: investment.investor,
          })
        );
        const parsedInvestmentSummary: InvestmentSummaryType = {
          amountOfInvestments: ethers.utils.formatEther(
            investmentSummary?.[0]?._hex
          ),
          numberOfInvestors: parseInt(investmentSummary?.[1]?._hex, 16),
          numberOfProjects: parseInt(investmentSummary?.[2]?._hex, 16),
          recentInvestments: parsedInvestments,
        };
        return parsedInvestmentSummary;
      }
    } catch (error) {
      throw new Error(`contract call failure: ${error}`);
    }
  };

  return (
    <StateContext.Provider
      value={{
        invest,
        connect,
        address,
        contract,
        addComment,
        searchquery,
        getComments,
        getProjects,
        likeProject,
        getInvestors,
        getUserProjects,
        getNumberOfLikes,
        getSingleProject,
        handleSearchChange,
        getProjectTokenData,
        getInvestmentSummary,
        createProject: publishProject,
        createTokenForProject: mintTokenForProject,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
