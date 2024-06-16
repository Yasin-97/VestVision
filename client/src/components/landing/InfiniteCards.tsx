import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { shortenAddress } from "@thirdweb-dev/react";
import { recentInvestmentsType } from "../../context";

export const InfiniteCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items?: recentInvestmentsType[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,#1DC071,white_20%,white_80%,black)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items?.map((item, idx) => (
          <li key={item.investor}>
            <blockquote>
              <div aria-hidden="true"></div>
              <p className=" text-sm text-white mt-5 rounded-xl border-2 border-[#28282e] py-2 px-4 font-semibold">
                <span className="font-semibold text-[#808191]">
                  @{shortenAddress(item.investor)}
                </span>{" "}
                <span
                  className="
                 text-[#ffd900bb] px-1"
                >
                  Invested
                </span>
                <span className="font-semibold px-1 py-[2px] bg-[#1c1c24] mr-2 rounded">
                  {item.amount} eth
                </span>
                <span className="text-[#ffd900bb] pr-1">In</span>
                {item.title}
              </p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
