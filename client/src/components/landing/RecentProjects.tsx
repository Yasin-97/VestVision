"use client";

import { motion } from "framer-motion";
import { FundCard } from "./FundCard";
import { ProjectType, useStateContext } from "../../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../../assets";

const RecentProjects = () => {
  const { address, contract, getProjects, getInvestmentSummary } =
    useStateContext();
  const [isLoading, setIsLoading] = useState({
    projects: true,
    investmentSummary: true,
  });
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [investmentSummary, setInvestmentSummary] = useState<any>([]);

  const fetchProjects = async () => {
    setIsLoading((loadingState) => ({ ...loadingState, projects: true }));

    const data = await getProjects();
    setProjects(data.slice(0, 4));
    setIsLoading((loadingState) => ({ ...loadingState, projects: false }));
  };

  const fetchInvestmentSummary = async () => {
    setIsLoading((loadingState) => ({
      ...loadingState,
      investmentSummary: true,
    }));
    const data = await getInvestmentSummary();
    setInvestmentSummary(data);
    setIsLoading((loadingState) => ({
      ...loadingState,
      investmentSummary: true,
    }));
  };

  useEffect(() => {
    if (contract) {
      fetchProjects();
      fetchInvestmentSummary();
    }
  }, [address, contract]);

  const navigate = useNavigate();

  const handleNavigate = (project: ProjectType) => {
    navigate(`/dashboard/Project-details/${project.pId}`, {
      state: project,
    });
  };

  return (
    <div className=" p-4 pt-0 mx-auto relative z-10  w-full">
      <div className="font-medium pb-8 text-4xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-[#ffee32] to-sky-200 bg-opacity-50">
        Innovation Queue
      </div>

      <p className="mb-8 text-lg  text-neutral-300 max-w-lg text-center mx-auto font-semibold">
        Explore the Latest Tech Ventures Seeking Your Support
      </p>
      <div className="items-center md:flex justify-center md:mx-auto md:space-x-10">
        {isLoading.projects && (
          <div className="w-full flex justify-center items-center min-h-[50vh]">
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
        )}
        {!isLoading.projects && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex gap-5 flex-wrap justify-center max-w-[1024px]"
          >
            {projects.map((project) => (
              <FundCard clickHandler={handleNavigate} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecentProjects;
