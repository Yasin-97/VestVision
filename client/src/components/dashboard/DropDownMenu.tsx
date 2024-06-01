import { motion } from "framer-motion";

interface DropDownMenuProps {
  onClose: () => void;
  scrollToHome: () => void;
  scrollToRecentCampaigns: () => void;
  scrollToFeatures: () => void;
  scrollToFAQ: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  onClose,
  scrollToRecentCampaigns,
  scrollToFeatures,
  scrollToFAQ,
}) => {
  const navItemHandler = (scrollTo: () => void) => {
    scrollTo();
    onClose();
  };
  return (
    <motion.div
      className="
    w-screen
    h-screen
    bg-gradient-to-b 
    from-black/[0.95]
     to-black/[0.8]
     bg-opacity-50
     text-slate-300
     p-6
     space-y-4
     absolute
     top-28
     left-0
     right-0
     z-50
     rounded-t-3xl
     border-t-2 border-[#77D9AA]
    "
      initial={{ opacity: 0, y: "-80%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-col flex space-y-10">
        <div
          onClick={() => navItemHandler(scrollToRecentCampaigns)}
          className="cursor-pointer bg-clip-text text-transparent 
          bg-gradient-to-b from-neutral-50
           to bg-neutral-400 bg-opacity-50 text-2xl hover:border-l-4 hover:border-[#77d9aaa8] px-2 transition-all"
        >
          Recent Campaigns
        </div>

        <div
          onClick={() => navItemHandler(scrollToFeatures)}
          className="cursor-pointer bg-clip-text text-transparent 
          bg-gradient-to-b from-neutral-50
           to bg-neutral-400 bg-opacity-50 text-2xl hover:border-l-4 hover:border-[#77d9aaa8] px-2 transition-all"
        >
          Features
        </div>

        <div
          onClick={() => navItemHandler(scrollToFAQ)}
          className="cursor-pointer bg-clip-text text-transparent 
          bg-gradient-to-b from-neutral-50
           to bg-neutral-400 bg-opacity-50 text-2xl hover:border-l-4 hover:border-[#77d9aaa8] px-2 transition-all"
        >
          FAQ
        </div>
      </div>
    </motion.div>
  );
};

export default DropDownMenu;
