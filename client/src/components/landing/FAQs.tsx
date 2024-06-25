import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const FAQs = () => {
  return (
    <div
      className=" mt-10 md:py-10 border-t-8 border-[#ffee32] w-full
          rounded-3xl
          
          "
    >
      <div className="p-4 md:px-20">
        <div className="text-4xl md:text-7xl font-bold md:font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to bg-white bg-opacity-50">
          Have questions?
        </div>
        <div className="  font-semibold md:font-normal text-3xl md:text-6xl text-gradient bg-gradient-to-r from-[#ffee32] to-blue-300 bg-clip-text text-transparent">
          Get answers.
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              How does the token creation process work?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Startups can easily create their own ERC-20 tokens through our
              platform. After submitting your project details, you’ll be guided
              through a simple token minting process, which includes setting
              your token’s name, symbol, and total supply. Our automated smart
              contracts handle the rest, ensuring a secure and seamless
              experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              What is project vetting, and how does it benefit me?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Project vetting is our quality assurance process. Each submitted
              project is reviewed by a panel of industry experts and voted on by
              our community. This ensures that only viable and promising
              startups are listed, providing a trustworthy selection for
              investors and a credible platform for startups.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              Can investors from any country participate?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Yes, our platform is designed for a global audience. Investors
              from around the world can participate, provided they comply with
              their local regulations regarding cryptocurrency investments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              What happens if a project doesn’t reach its funding goal?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              If a project doesn’t reach its funding goal within the set
              timeframe, the funds are returned to the investors. This ensures
              that investors’ contributions are protected and startups are
              motivated to engage actively with their backers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              How are funds released to startups?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Funds are released based on milestone achievements. As your
              startup meets the goals outlined in your roadmap, portions of the
              funding are unlocked. This milestone-based approach aligns the
              interests of startups and investors and promotes project
              completion.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              Are there any fees associated with using the platform?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              We have a transparent fee structure. Startups pay a small
              percentage of the funds raised to support platform maintenance and
              development. Investors are not charged any fees for participating.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent text-start">
              How does the platform ensure the security of transactions?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Security is our top priority. All transactions are conducted
              through secure blockchain technology, and funds are held in escrow
              until milestones are met. We also regularly audit our smart
              contracts to ensure the highest standards of safety.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
