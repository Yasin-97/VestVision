import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../../assets";
import { ProjectType, useStateContext } from "../../context";

type DisplayProjectType = {
  title: string;
};
const DisplayProjects = ({ title }: DisplayProjectType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProfilePage = pathname.includes("/dashboard/profile");

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const { address, contract, getUserProjects, searchquery } = useStateContext();

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getUserProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

  const handleNavigate = (project: ProjectType) => {
    navigate(`/dashboard/project-details/${project.pId}`, {
      state: project,
    });
  };

  const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(searchquery.toLowerCase());
  });

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({filteredProjects.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && searchquery && filteredProjects.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            There is no maching project!
          </p>
        )}
        {isProfilePage &&
          !searchquery &&
          !isLoading &&
          filteredProjects.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              you have not created any project yet!
            </p>
          )}

        {!isLoading &&
          filteredProjects.length > 0 &&
          filteredProjects.map((project) => (
            <FundCard
              key={uuidv4()}
              {...project}
              handleClick={() => handleNavigate(project)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayProjects;
