import React from "react";
import { shortenAddress } from "../../utils";

export type SingleCommentProps = {
  dir: string;
  firstColor: string;
  secondColor: string;
  isInvestor: boolean;
  address: string;
  comment: string;
};

const SingleComment = ({
  dir,
  firstColor,
  secondColor,
  isInvestor,
  address,
  comment,
}: SingleCommentProps) => {
  return (
    <div className="p-4 bg-[#13131a] rounded-[10px] space-y-4">
      <div className="flex flex-col border border-b-2 last:border-none">
        <div className="flex items-center gap-2">
          <div
            style={{
              background: `linear-gradient(to ${dir}, ${firstColor}, ${secondColor})`,
            }}
            className="h-8 w-8 rounded-full"
          />
          <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-[#808191]">
            {shortenAddress(address)}{" "}
            {isInvestor && (
              <span className="text-[9px] text-[#4acd8d]">(Investor)</span>
            )}
          </h4>
        </div>
        <p className="mt-[20px] font-epilogue font-semibold text-[14px] leading-[22px] text-white">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default SingleComment;
