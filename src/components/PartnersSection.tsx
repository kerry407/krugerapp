import Image from "next/image";
import fresno from "@/images/fresno.png";
import chicago_state from "@/images/chicagostate.png";
import suny from "@/images/suny.png";
import arkansas from "@/images/arkansas.png";
import dallas from "@/images/dallas.png";
import westernwashington from "@/images/westernwashington.png";

const PartnersSection = () => {
  return (
    <section id="schools" className="pt-12">
      <div>
        <h2 className="font-museo-slab text-[29px] text-primary font-bold leading-[1.1]">
          A few of our partner schools
        </h2>
        <p className="text-neutral-primary my-4 leading-6">
          We partner with your school and over 700 college, university and
          community college campuses to deliver refunds to students across the
          U.S. including:
        </p>
      </div>

      <div className="flex flex-col flex-wrap gap-4 my-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Image
            src={fresno}
            alt="fresno"
            className="w-[30%] max-w-[171px] h-full object-contain p-2 max-h-[100px]"
          />
          <Image
            src={chicago_state}
            alt="chicago_state"
            className="w-[30%] max-w-[171px] h-full object-contain p-2 max-h-[100px]"
          />
          <Image
            src={suny}
            alt="suny"
            className="w-[30%] max-w-[171px] h-full object-contain p-2 max-h-[100px]"
          />
        </div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <Image
            src={arkansas}
            alt="arkansas"
            className="w-[30%] max-w-[171px] h-full object-contain p-2 max-h-[100px]"
          />
          <Image
            src={dallas}
            alt="dallas"
            className="w-[30%] max-w-[171px] h-full object-contain p-2 max-h-[100px]"
          />
          <Image
            src={westernwashington}
            alt="westernwashington"
            className="w-[30%] max-w-[171px] h-full object-contain p-2 max-h-[100px]"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
