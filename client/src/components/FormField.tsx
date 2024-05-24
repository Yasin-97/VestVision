import { BigNumber } from "ethers";
import { ChangeEvent, ChangeEventHandler } from "react";

type FormFieldType = {
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  labelName?: string;
  className?: string;
  textAreaRow?: number;
  value?: any;
  inputType?: string;
  isTextArea?: boolean;
  isLoading?: boolean;
};
const FormField = ({
  labelName,
  className,
  textAreaRow = 10,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  isLoading,
}: FormFieldType) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          disabled={isLoading}
          spellCheck
          required
          value={value}
          onChange={handleChange}
          rows={textAreaRow}
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${className}`}
        />
      ) : (
        <input
          disabled={isLoading}
          spellCheck
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className={`py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${className}`}
        />
      )}
    </label>
  );
};

export default FormField;
