import { ButtonHTMLAttributes } from "react";

type ButtonType = {
  btnType?: "submit" | "reset" | "button";
  title: string;
  handleClick: () => void;
  styles: string;
};

const Button = ({ btnType, title, handleClick, styles }: ButtonType) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
