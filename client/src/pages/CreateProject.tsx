import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { Button, FormField, Loader } from "../components";
import { checkIfImage } from "../lib/utils";
import { ProjectType, useStateContext } from "../context";
import SelectorInput from "../components/dashboard/SelectorInput";
type formDataType = ProjectType;

const projectCategories = [
  { name: "AI" },
  { name: "IoT" },
  { name: "Edtech" },
  { name: "Gaming" },
  { name: "Fintech" },
  { name: "VR & AR" },
  { name: "AgriTech" },
  { name: "Robotics" },
  { name: "Blockchain" },
  { name: "Quantum Computing" },
];
const CreateProject = () => {
  const { createProject, getProjects } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<formDataType>({
    ownerName: "",
    category: "",
    title: "",
    description: "",
    target: "0.5",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (fieldName === "description") {
      return setForm((prevForm: ProjectType) => ({
        ...prevForm,
        description: e as string,
      }));
    }
    setForm((prevForm: ProjectType) => ({
      ...prevForm,
      [fieldName]: (e as ChangeEvent<HTMLInputElement>).target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        try {
          setIsLoading(true);
          await createProject({
            ...form,
            target: ethers.utils.parseUnits(form.target as string, 18),
          });
          const projects = await getProjects();
          setIsLoading(false);
          navigate(`/dashboard/create-token/${projects.length - 1}`);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        alert("provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Project
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <SelectorInput
          placeholderText="Select Project Category"
          labelName="Category"
          options={projectCategories}
          selectCallback={(selected) =>
            setForm({ ...form, category: selected })
          }
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.ownerName}
            handleChange={(e) => handleFormFieldChange("ownerName", e)}
          />
          <FormField
            labelName="Project Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Whitepaper *"
          placeholder="Write project's whitepaper"
          isTextEditor
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Project image *"
          placeholder="Place image URL of your project"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <Button
            btnType="submit"
            title="Submit new project"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
