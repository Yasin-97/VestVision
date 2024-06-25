import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { colorCollection1, colorCollection2, colorDir } from "../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const daysLeft = (deadline: string) => {
  if (deadline) {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
  }
  return null;
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (
  url: string,
  callback: (isTrue: boolean) => void
) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const shortenAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const avatarColor = () => {
  const firstColor =
    colorCollection1[Math.floor(Math.random() * colorCollection1.length)];
  const secondColor =
    colorCollection2[Math.floor(Math.random() * colorCollection2.length)];
  const dir = colorDir[Math.floor(Math.random() * colorDir.length)];
  return { firstColor, secondColor, dir };
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
