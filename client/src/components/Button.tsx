import { ButtonHTMLAttributes } from "react";
import { RiLoader4Fill } from "react-icons/ri";

type ButtonType = {
  btnType?: "submit" | "reset" | "button";
  title: string;
  handleClick?: () => void;
  styles: string;
  isLoading?: boolean;
};

const Button = ({
  btnType,
  title,
  handleClick,
  styles,
  isLoading,
}: ButtonType) => {
  return (
    <button
      type={btnType}
      className={`flex justify-center items-center bg-[#8c6dfd] font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {isLoading && <RiLoader4Fill className={`rotate-constant w-8 h-8`} />}
      {!isLoading && title}
    </button>
  );
};

export default Button;
