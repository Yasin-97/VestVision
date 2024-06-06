import { useState, useEffect } from "react";

import { DisplayProjects } from "../components";
import { ProjectType, useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const { address, contract, getProjects } = useStateContext();

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

  return (
    <DisplayProjects
      title="All Projects"
      isLoading={isLoading}
      projects={projects}
    />
  );
};

export default Home;
