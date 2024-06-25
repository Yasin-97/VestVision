import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../context";
import { Button } from "..";
import { logo, menu, search } from "../../assets";
import { navlinks } from "../../constants";

type Props = {};

const Navbar = (props: Props) => {
  const { address, connect, handleSearchChange, searchquery } =
    useStateContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreateCampaign = pathname === "/dashboard/create-project";
  const isProfile = pathname === "/dashboard/profile";
  const isMainDashboard = pathname === "/dashboard";
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {(isMainDashboard || isProfile) && (
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            value={searchquery}
            onChange={(e) => handleSearchChange(e.target.value)}
            type="text"
            placeholder="Search for Projects"
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          />

          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <img
              src={search}
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>
      )}
      {!isCreateCampaign && (
        <div className="sm:flex hidden flex-row justify-end gap-4">
          <Button
            btnType="button"
            title={address ? "Create a project" : "Connect"}
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("/dashboard/create-project");
              else connect();
            }}
          />
        </div>
      )}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
            onClick={() => {
              navigate("/dashboard");
              setToggleDrawer(false);
            }}
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 hover:bg-[#3a3a4368] cursor-pointer ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <Button
              btnType="button"
              title={address ? "Create a project" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) {
                  navigate("/dashboard/create-project");
                  setToggleDrawer(false);
                } else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
