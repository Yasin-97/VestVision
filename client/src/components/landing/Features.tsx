import { CardHoverEffect } from "./CardHoverEffectContainer";

const Features = () => {
  return (
    <div className="max-w-5xl mx-auto py-20">
      <div className=" font-medium pb-8 text-4xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-[#ffd100] to-sky-200 bg-opacity-50">
        Core Capabilities
      </div>
      <p
        className="text-lg font-semibold
          text-neutral-300 max-w-lg 
          text-center mx-auto"
      >
        Strong Foundations for Your Innovative Endeavors
      </p>

      <CardHoverEffect />
    </div>
  );
};

export default Features;
