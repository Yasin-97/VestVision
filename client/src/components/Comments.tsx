import FormField from "./FormField";
import Button from "./Button";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { SingleComment } from "../components";
import { SingleCommentProps } from "./singleComment";

type CommentsType = { comments: SingleCommentProps[] };

const Comments = ({ comments }: CommentsType) => {
  return (
    <div className="flex items-start gap-5 mt-5">
      <div className=" p-4 flex flex-col bg-[#1c1c24] rounded-[10px] flex-[2]">
        <p className="mb-5 font-epilogue fount-medium text-[20px] leading-[30px] text-[#808191]">
          People's thought on it
        </p>
        <div className="flex flex-col gap-3">
          {!comments.length && (
            <div className="flex flex-col items-center h-[300px] justify-center ">
              <BsFileEarmarkSpreadsheet className="text-[#808191] text-4xl mb-6" />
              <p className=" mb-5 font-epilogue fount-medium text-[16px] leading-[30px] text-[#808191]">
                There is no comment yet.
              </p>
            </div>
          )}

          {comments &&
            comments.map(
              ({
                dir,
                firstColor,
                secondColor,
                isDonator,
                address,
                comment,
              }) => (
                <SingleComment
                  isDonator={isDonator}
                  dir={dir}
                  firstColor={firstColor}
                  secondColor={secondColor}
                  address={address}
                  comment={comment}
                />
              )
            )}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col bg-[#1c1c24] rounded-[10px]">
        <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
          what do you think of it?
        </p>
        <div className="mt-[30px]">
          <FormField
            className="mb-5"
            textAreaRow={5}
            placeholder="Your thought"
            isTextArea
            // value={amount}
            // onChange={(e) => setAmount(e.target.value)}
          />

          <Button
            btnType="button"
            title="Fund Campaign"
            styles="w-full bg-[#8c6dfd]"
            // handleClick={handleDonate}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
