import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { BigNumber, ethers } from "ethers";

import { money } from "../assets";
import { Button, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { CampaignType, useStateContext } from "../context";
import SelectorInput from "../components/SelectorInput";
type formDataType = CampaignType & { name: string };

const campaignCategories = [
  { name: "AI" },
  { name: "IoT" },
  { name: "Edtech" },
  { name: "Gaming" },
  { name: "Fintech" },
  { name: "VR & AR" },
  { name: "AgriTech" },
  { name: "Robotics" },
  { name: "Blockchain" },
  { name: "Transportation" },
];
const CreateCampaign = () => {
  const { createCampaign, getCampaigns } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<formDataType>({
    category: "",
    name: "",
    title: "",
    description: "",
    target: "0.5",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target as string, 18),
        });
        const campaigns = await getCampaigns();
        setIsLoading(false);
        navigate(`/create-token/${campaigns.length - 1}`);
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
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <SelectorInput
          placeholderText="Select Campaign Category"
          labelName="Category"
          options={campaignCategories}
          selectCallback={(selected) =>
            setForm({ ...form, category: selected })
          }
        />
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("name", e)
            }
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("title", e)
            }
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("description", e)
          }
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
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("target", e)
            }
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("deadline", e)
            }
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("image", e)
          }
        />

        <div className="flex justify-center items-center mt-[40px]">
          <Button
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
