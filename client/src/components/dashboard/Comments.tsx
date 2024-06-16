import FormField from "./FormField";
import Button from "./Button";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { SingleComment } from "..";
import { CommentType, useStateContext } from "../../context";
import { useEffect, useState } from "react";
import { loader } from "../../assets";

type CommentsType = {
  projectId: string;
};

const Comments = ({ projectId }: CommentsType) => {
  const { getComments, addComment, contract, address } = useStateContext();

  const [projectComments, setProjectComments] = useState<CommentType[]>([]);

  const [isFetchCommentsLoading, setIsFetchCommentsLoading] = useState(false);
  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);

  const [comment, setComment] = useState<string>("");

  const fetchComments = async () => {
    try {
      if (projectId) {
        setIsFetchCommentsLoading(true);
        const allComments = await getComments(projectId);

        setProjectComments(allComments);
        setIsFetchCommentsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [contract, address]);

  const handleAddComment = async () => {
    try {
      setIsAddCommentLoading(true);
      await addComment(projectId, comment);
      setComment("");
      setIsAddCommentLoading(false);
      fetchComments();
    } catch (error) {
      setIsAddCommentLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 mt-20 pb-20">
      <div className="w-full p-4 flex flex-col bg-[#1c1c24] rounded-[10px] flex-[2]">
        <p className="mb-5 font-epilogue fount-medium text-[20px] leading-[30px] text-[#808191]">
          People's thought on it
        </p>
        <div className="flex flex-col gap-1 max-h-[500px] overflow-auto">
          {!isFetchCommentsLoading && !projectComments?.length && (
            <div className="flex flex-col items-center h-[300px] justify-center ">
              <BsFileEarmarkSpreadsheet className="text-[#808191] text-4xl mb-6" />
              <p className=" mb-5 font-epilogue fount-medium text-[16px] leading-[30px] text-[#808191]">
                There is no comment yet.
              </p>
            </div>
          )}
          {isFetchCommentsLoading && (
            <img
              src={loader}
              alt="loader"
              className="w-[100px] h-[100px] object-contain self-center"
            />
          )}

          {!isFetchCommentsLoading &&
            projectComments &&
            projectComments.map(
              ({ owner, text, firstColor, secondColor, dir, isInvestor }) => (
                <SingleComment
                  isInvestor={isInvestor}
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
        <p className="font-epilogue fount-medium text-[20px] leading-[30px] lg:text-center text-[#808191]">
          what do you think of it?
        </p>
        <div className="mt-[30px]">
          <FormField
            isLoading={isAddCommentLoading}
            className="mb-5"
            textAreaRow={5}
            placeholder="Your thought"
            isTextArea
            value={comment}
            handleChange={(e) => setComment(e.target.value)}
          />

          <Button
            isLoading={isAddCommentLoading}
            btnType="button"
            title="Add Comment"
            styles="w-full text-white"
            handleClick={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
