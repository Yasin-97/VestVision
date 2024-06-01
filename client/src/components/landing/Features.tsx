import { CardHoverEffect } from "./CardHoverEffectContainer";

const Features = () => {
  return (
    <div className="max-w-5xl mx-auto py-20">
      <div className="pb-8 text-4xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-[#1DC071] to-sky-200 bg-opacity-50">
        Streamline your business with our services
      </div>
      <p
        className="mt-4 text-lg font-normal
          text-neutral-300 max-w-lg 
          text-center mx-auto"
      >
        From website design to social media management, We offer a wide range of
        services to help you grow your business.
      </p>

      <CardHoverEffect />
    </div>
  );
};

export default Features;
