import FormField from "./FormField";
import Button from "./Button";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { SingleComment } from "../components";
import { SingleCommentProps } from "./singleComment";
import { useStateContext } from "../context";
import { useEffect, useState } from "react";
import { loader } from "../assets";

type CommentsType = {
  campaignId: number;
};

type campaignCommentsType = {
  owner: string;
  text: string;
  firstColor: string;
  secondColor: string;
  dir: string;
}[];

const Comments = ({ campaignId }: CommentsType) => {
  const { getComments, addComment } = useStateContext();

  const [campaignComments, setCampaignComments] =
    useState<campaignCommentsType>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [comment, setComment] = useState<string>("");

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const allComments = await getComments(campaignId);

      setCampaignComments(allComments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {

  // }, []);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 mt-5 pb-20">
      <div className="w-full p-4 flex flex-col bg-[#1c1c24] rounded-[10px] flex-[2]">
        <p
          onClick={fetchComments}
          className="mb-5 font-epilogue fount-medium text-[20px] leading-[30px] text-[#808191]"
        >
          People's thought on it
        </p>
        <div className="flex flex-col gap-1 max-h-[500px] overflow-auto">
          {!isLoading && !campaignComments.length && (
            <div className="flex flex-col items-center h-[300px] justify-center ">
              <BsFileEarmarkSpreadsheet className="text-[#808191] text-4xl mb-6" />
              <p className=" mb-5 font-epilogue fount-medium text-[16px] leading-[30px] text-[#808191]">
                There is no comment yet.
              </p>
            </div>
          )}
          {isLoading && (
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain self-center"
            />
          )}

          {!isLoading &&
            campaignComments &&
            campaignComments.map(
              ({ owner, text, firstColor, secondColor, dir }) => (
                <SingleComment
                  isDonator={true}
                  dir={dir}
                  firstColor={firstColor}
                  secondColor={secondColor}
                  address={owner}
                  comment={text}
                />
              )
            )}
        </div>
      </div>

      <div className="w-full flex-1 p-4 flex flex-col bg-[#1c1c24] rounded-[10px]">
        <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
          what do you think of it?
        </p>
        <div className="mt-[30px]">
          <FormField
            className="mb-5"
            textAreaRow={5}
            placeholder="Your thought"
            isTextArea
            value={comment}
            handleChange={(e) => setComment(e.target.value)}
          />

          <Button
            btnType="button"
            title="Fund Campaign"
            styles="w-full bg-[#8c6dfd]"
            handleClick={() => addComment(campaignId, comment)}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
