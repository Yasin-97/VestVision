import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormField, Loader } from "../components";
import { ProjectTokenType, useStateContext } from "../context";

type formDataType = ProjectTokenType;
const CreateProject = () => {
  const { createTokenForProject } = useStateContext();
  const navigate = useNavigate();
  let { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<formDataType>({
    name: "",
    symbol: "",
    totalSupply: 0,
    projectOwnerShare: 0,
    teamAddress: "",
    teamShare: 0,
    advisorAddress: "",
    advisorShare: 0,
    earlyInvestorsAddress: "",
    earlyInvestorsShare: 0,
  });
  useEffect(
    () =>
      setForm({
        ...form,
        projectId: Number(projectId),
      }),
    [projectId]
  );

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.projectId !== undefined &&
      form.name !== "" &&
      form.symbol !== "" &&
      form.totalSupply > 0
    ) {
      setIsLoading(true);
      await createTokenForProject(form);
      setIsLoading(false);
      navigate("/");
    } else {
      alert("provide valid image URL");
    }
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Project's Token
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Token Name *"
            placeholder="Bitcoin"
            inputType="text"
            value={form.name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("name", e)
            }
          />
          <FormField
            labelName="Token Symbol *"
            placeholder="BTC"
            inputType="text"
            value={form.symbol}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("symbol", e)
            }
          />
        </div>

        <FormField
          labelName="Total Supply *"
          placeholder="Token Total Supply "
          value={form.totalSupply}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("totalSupply", e)
          }
        />

        <div className="w-full flex flex-col justify-start gap-4 p-4 py-10 bg-[#13131a] rounded-[10px]">
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
            <span className="font-epilogue font-extrabold text-[14px] leading-[22px] text-gray-300">
              Percentage Share:{" "}
            </span>
            Allocating percentage shares for each party is optional. The default
            allocation is 0%.
          </span>
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
            <span className="font-epilogue font-extrabold text-[14px] leading-[22px] text-gray-300">
              Total Allocation:{" "}
            </span>
            The combined allocation for all parties must not surpass 100% of the
            total token supply.
          </span>
        </div>
        <FormField
          labelName="Owner Share (default to 0)"
          placeholder="Wallet Address Of Project owner"
          inputType="text"
          value={form.projectOwnerShare}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormFieldChange("projectOwnerShare", e)
          }
        />
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Team Address (optional)"
            placeholder="Wallet Address Of Team"
            inputType="text"
            value={form.teamAddress}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("teamAddress", e)
            }
          />
          <FormField
            labelName="Team Share (default to 0)"
            placeholder="0%"
            inputType="text"
            value={form.teamShare}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("teamShare", e)
            }
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Advisor Address (optional)"
            placeholder="Wallet Address Of Advisor"
            inputType="text"
            value={form.advisorAddress}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("advisorAddress", e)
            }
          />
          <FormField
            labelName="Advisor Share (default to 0)"
            placeholder="0%"
            inputType="text"
            value={form.advisorShare}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("advisorShare", e)
            }
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Early Investors Address (optional)"
            placeholder="Wallet Address Of Early Investors"
            inputType="text"
            value={form.earlyInvestorsAddress}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("earlyInvestorsAddress", e)
            }
          />
          <FormField
            labelName="Early Investors Share (default to 0)"
            placeholder="0%"
            inputType="text"
            value={form.earlyInvestorsShare}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormFieldChange("earlyInvestorsShare", e)
            }
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <Button
            btnType="submit"
            title="Create project Token"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
