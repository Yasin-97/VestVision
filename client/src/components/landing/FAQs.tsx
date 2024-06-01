import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const FAQs = () => {
  return (
    <div
      className=" mt-10 md:py-10 border-t-8 border-[#1dc0717c] w-full
          rounded-3xl
          
          "
    >
      <div className=" p-10 md:p-4 md:px-20">
        <div className="text-4xl md:text-7xl font-bold md:font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to bg-white bg-opacity-50">
          Have questions?
        </div>
        <div className="  font-semibold md:font-normal text-3xl md:text-6xl text-gradient bg-gradient-to-r from-[#1DC071] to-blue-300 bg-clip-text text-transparent">
          Get answers.
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent">
              What is Bird?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Bird is a full fledge marketing agency that specializes in
              branding, web design, and digital marketing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent">
              What is Bird?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Bird is a full fledge marketing agency that specializes in
              branding, web design, and digital marketing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent">
              What is Bird?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Bird is a full fledge marketing agency that specializes in
              branding, web design, and digital marketing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-none">
            <AccordionTrigger className="text-slate-200 decoration-transparent">
              What is Bird?
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              Bird is a full fledge marketing agency that specializes in
              branding, web design, and digital marketing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
