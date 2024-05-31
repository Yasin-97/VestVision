import { PiHeadsetFill } from "react-icons/pi";
import { GiToken } from "react-icons/gi";
import { RiFundsFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { RiFundsBoxFill } from "react-icons/ri";
import { RiSecurePaymentFill } from "react-icons/ri";
import { HoverEffect } from "./CardHoverEffect";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    icon: (
      <div className="bg-blue-100 p-4 rounded-full">
        <GiToken className="w-8 h-8 text-[#8c6dfd]" />
      </div>
    ),
    title: "ERC-20 Token Creation",
    description:
      "Streamline token creation with secure smart contracts so startups can mint their unique ERC-20 tokens.",
  },
  {
    icon: (
      <div className="bg-blue-100 p-4 rounded-full">
        <FaWallet className="w-8 h-8 text-[#8c6dfd]" />
      </div>
    ),
    title: "Integrated Wallets",
    description:
      "Seamless connection with Metamask for easy transactions and wallet management.",
  },
  {
    icon: (
      <div className="bg-blue-100 p-4 rounded-full">
        <RiFundsFill className="w-8 h-8 text-[#8c6dfd]" />
      </div>
    ),
    title: "Transparent Funding",
    description:
      "Monitor funding progress with live updates and transparent transaction records.",
  },
  {
    icon: (
      <div className="bg-blue-100 p-4 rounded-full">
        <RiSecurePaymentFill className="w-8 h-8 text-[#8c6dfd]" />
      </div>
    ),
    title: "Escrow Protection",
    description:
      "Funds are held in escrow until predefined milestones are met, ensuring accountability.",
  },
  {
    icon: (
      <div className="bg-blue-100 p-4 rounded-full">
        <RiFundsBoxFill className="w-8 h-8 text-[#8c6dfd]" />
      </div>
    ),
    title: "Smart Fund Release",
    description:
      "Automated disbursement of funds as startups hit their roadmap milestones.",
  },
  {
    icon: (
      <div className="bg-blue-100 p-4 rounded-full">
        <PiHeadsetFill className="w-8 h-8 text-[#8c6dfd]" />
      </div>
    ),
    title: "Support",
    description:
      "We offer support for all our clients. We are here to help you with any issues or questions you may have.",
  },
];
