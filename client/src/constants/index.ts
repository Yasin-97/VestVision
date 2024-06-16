import { createProject, dashboard, logout, profile } from "../assets";

export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: dashboard,
    link: "/dashboard",
  },
  {
    name: "Create Project",
    imgUrl: createProject,
    link: "/dashboard/create-project",
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/dashboard/profile",
  },
  {
    name: "Logout",
    imgUrl: logout,
    link: "/",
  },
];

export const colorDir = ["top", "bottom", "right", "left"];
export const colorCollection1 = [
  "#e6194B",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#42d4f4",
  "#f032e6",
  "#bfef45",
  "#fabed4",
];

export const colorCollection2 = [
  "#469990",
  "#dcbeff",
  "#9A6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#a9a9a9",
];
