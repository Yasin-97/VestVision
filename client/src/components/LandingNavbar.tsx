"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlignJustify, X } from "lucide-react";
import DropDownMenu from "./dashboard/DropDownMenu";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { useStateContext } from "../context";
import Button from "./dashboard/Button";

type NavbarProps = {
  scrollToHome: () => void;
  scrollToRecentProjects: () => void;
  scrollToFeatures: () => void;
  scrollToFAQ: () => void;
};

const LandingNavbar = ({
  scrollToHome,
  scrollToRecentProjects,
  scrollToFeatures,
  scrollToFAQ,
}: NavbarProps) => {
  const navigate = useNavigate();

  const { address, connect } = useStateContext();

  const connectAndNavigate = async () => {
    await connect();
    if (address) navigate("/dashboard");
  };

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
        <Link to={"/dashboard"} className="cursor-pointer">
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
        <div onClick={scrollToRecentProjects} className="hover:text-gray-50">
          Recent Projects
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
          <>
            <X
              className="w-8 h-8 text-slate-300 cursor-pointer"
              onClick={closeDropDown}
            />
            <DropDownMenu
              scrollToHome={scrollToHome}
              scrollToRecentProjects={scrollToRecentProjects}
              scrollToFeatures={scrollToFeatures}
              scrollToFAQ={scrollToFAQ}
              onClose={closeDropDown}
            />
          </>
        ) : (
          <AlignJustify
            onClick={toggleDropDown}
            className="w-8 h-8 text-slate-300 cursor-pointer"
          />
        )}
      </div>

      <div className="hidden md:flex">
        <Button
          btnType="button"
          title={address ? "Explore More" : "Get Connected"}
          styles=" bg-black
  font-semibold px-6 py-2 border border-gray-600 rounded-[8px] transition-all 
  !text-gray-400 hover:!text-gray-300 hover:border-gray-500"
          handleClick={() => {
            if (address) navigate("/dashboard");
            else connectAndNavigate();
          }}
        />
      </div>
    </div>
  );
};

export default LandingNavbar;
