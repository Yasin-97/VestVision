import { CardBody, CardContainer, CardItem } from "./3DCard";
import { CampaignType } from "../../context";
import { MdVerifiedUser } from "react-icons/md";
type FundCardType = { campaign: CampaignType };
export function FundCard({ campaign }: FundCardType) {
  return (
    <CardContainer
      className="inter-var"
      containerClassName="w-[340px] lg:w-[390px]"
    >
      <CardBody className="bg-[#1c1c24] relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] w-auto h-auto rounded-t-xl p-6 border-b-4 border-[#808191]">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          {campaign.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className=" text-sm max-w-sm mt-2 text-[#808191]"
        >
          {campaign.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              className=" ml-1 font-epilogue font-semibold text-[30px] text-white leading-[22px]"
            >
              {campaign.amountCollected}
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
            className=" p-2 flex gap-1 items-center"
          >
            <MdVerifiedUser className="text-green-400 text-xl" />
            <span className=" text-white">VERIFIED</span>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
