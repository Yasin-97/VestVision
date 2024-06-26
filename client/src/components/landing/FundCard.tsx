import { CardBody, CardContainer, CardItem } from "./3DCard";
import { ProjectType } from "../../context";
import { MdVerifiedUser } from "react-icons/md";
type FundCardType = {
  project: ProjectType;
  clickHandler: <T extends ProjectType>(arg: T) => void;
};
export function FundCard({ project, clickHandler }: FundCardType) {
  return (
    <CardContainer
      onClick={() => clickHandler(project)}
      className=" inter-var"
      containerClassName=" w-[340px] lg:w-[390px]"
    >
      <CardBody className="bg-[#1c1c24] relative hover:shadow-2xl hover:shadow-emerald-500/[0.1] w-auto h-auto rounded-t-xl p-6 border-b-4 border-[#808191]">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          {project.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className=" text-sm font-semibold mt-2 text-[#808191] line-clamp-3"
        >
          <span dangerouslySetInnerHTML={{ __html: project.description }} />
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={project.image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <div className="flex flex-col gap-2">
            <CardItem
              translateZ={20}
              as="button"
              className=" ml-1 font-epilogue font-semibold text-2xl text-white leading-[22px]"
            >
              {project.amountCollected}
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className=" py-1 px-2 rounded-[8px] font-epilogue font-semibold text-[14px] text-[#808191] leading-[22px] bg-[#28282e]"
            >
              Total amount Raised
            </CardItem>
          </div>
          <CardItem
            translateZ={20}
            as="button"
            className=" p-2 flex gap-1 items-center self-end"
          >
            <MdVerifiedUser className="text-green-400 text-xl" />
            <span className=" text-white text-sm">VERIFIED</span>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
