import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

type SelectorInputType = {
  labelName: string;
  options: { name: string }[];
  placeholderText: string;
  selectCallback: (selected: string) => void;
};

const SelectorInput = ({
  labelName,
  options,
  placeholderText = "Select option",
  selectCallback,
}: SelectorInputType) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => selectCallback(selected), [selected]);

  return (
    <div className="w-full relative">
      <label className="flex-1 w-full flex flex-col">
        {labelName && (
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            {labelName}
          </span>
        )}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer flex justify-between py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] 
 
        
        ${!selected && "text-gray-700"}`}
      >
        {selected ? (
          selected?.length > 25 ? (
            selected?.substring(0, 25) + "..."
          ) : (
            selected
          )
        ) : (
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">
            {placeholderText}
          </span>
        )}
        <BiChevronDown
          size={20}
          className={`text-[#808191] transition-all ${open && "rotate-180"}`}
        />
      </div>
      <ul
        className={`selector-options absolute top-[84px] right-0 left-0 p-2 border-[1px] border-[#3a3a43] bg-[#3a3a43] placeholder:text-[#4b5264] rounded-[10px] overflow-y-auto transition-all ${
          open ? "max-h-60" : "max-h-0 !p-0 border-none"
        } `}
      >
        {options?.map((option) => (
          <li
            className={`font-semibold cursor-pointer border-b border-[#1c1c24] last:border-none py-[15px] sm:px-[25px] px-[15px] text-white text-[14px] placeholder:text-[#4b5264] hover:bg-[#1c1c24] hover:text-white hover:rounded-xl
                ${
                  option?.name?.toLowerCase() === selected?.toLowerCase() &&
                  " text-white"
                }
                ${
                  option?.name?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
            onClick={() => {
              if (option?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(option?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {option?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectorInput;
