"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlignJustify, X } from "lucide-react";
import DropDownMenu from "./dashboard/DropDownMenu";
import { Link } from "react-router-dom";
import { logo } from "../assets";

type NavbarProps = {
  scrollToHome: () => void;
  scrollToRecentCampaigns: () => void;
  scrollToFeatures: () => void;
  scrollToFAQ: () => void;
};

const LandingNavbar = ({
  scrollToHome,
  scrollToRecentCampaigns,
  scrollToFeatures,
  scrollToFAQ,
}: NavbarProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const closeDropDown = () => {
    setIsDropDownVisible(false);
  };

  return (
    <div className="p-6 md:p-10 flex items-center justify-between z-50">
      <div>
        <Link to={"/"} className="cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
        </Link>
      </div>
      <div
        className="cursor-pointer hidden 
            md:flex space-x-10 items-center
             text-slate-300 text-center 
             bg-clip-text text-transparent 
             bg-gradient-to-b from-neutral-50
              to bg-neutral-400 bg-opacity-50 font-semibold"
      >
        <div onClick={scrollToHome} className="hover:text-gray-50">
          Home
        </div>
        <div onClick={scrollToRecentCampaigns} className="hover:text-gray-50">
          Recent Campaigns
        </div>

        <div onClick={scrollToFeatures} className="hover:text-gray-50">
          Features
        </div>
        <div onClick={scrollToFAQ} className="hover:text-gray-50">
          FAQ
        </div>
      </div>

      <div className="flex md:hidden">
        {isDropDownVisible ? (
          <div className="w-8 h-8 text-slate-300 cursor-pointer">
            <X onClick={closeDropDown} />
            <DropDownMenu
              scrollToHome={scrollToHome}
              scrollToRecentCampaigns={scrollToRecentCampaigns}
              scrollToFeatures={scrollToFeatures}
              scrollToFAQ={scrollToFAQ}
              onClose={closeDropDown}
            />
          </div>
        ) : (
          <AlignJustify
            onClick={toggleDropDown}
            className="w-8 h-8 text-slate-300 cursor-pointer"
          />
        )}
      </div>

      <div className="hidden md:flex">
        <Link
          to="/contact"
          className=" bg-black
  font-semibold px-6 py-2 border border-gray-600 rounded-[4px] transition-all 
  text-gray-400 hover:text-gray-300 hover:border-gray-500"
        >
          Get Connected
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;
