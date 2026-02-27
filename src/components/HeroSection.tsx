import Image from "next/image";
import hero_img from "@/images/web-hero-image.png";
import mobile_hero_img from "@/images/mobile-hero-image.png";

const HeroSection = () => {
  return (
    <main className="pt-[125px]">
      <div className="flex max-md:flex-col justify-between max-w-[1170px] w-full mx-auto relative gap-6">
        <div>
          <h1 className="font-museo-slab text-[50px] max-[576px]:text-[34px] text-primary font-bold leading-[1.1] max-[1320px]:w-[90%] max-[1320px]:mx-auto max-[820px]:my-6">
            Your college or university may have money for you!
          </h1>

          <div className="shrink-0 min-[576px]:hidden w-full mt-6 h-[197px] relative">
            <Image
              src={mobile_hero_img}
              alt="Hero Image"
              className="object-cover"
              fill
            />
          </div>

          <div className="flex justify-between gap-10 min-[576px]:w-[90%] min-[576px]:mx-auto">
            <div className="pt-6 space-y-2 max-[576px]:w-[90%] max-[576px]:mx-auto">
              <h3 className="font-museo-slab text-[18px] text-primary font-bold">
                Did you?
              </h3>
              <ul className="list-disc list-outside text-[#333] pl-[24px]">
                <li className="leading-[24px]">Drop a class?</li>
                <li className="leading-[24px]">Overpay your tuition?</li>
                <li className="leading-[24px]">Get a scholarship?</li>
                <li className="leading-[24px]">
                  Have money left over from financial aid?
                </li>
              </ul>
            </div>

            <div className="min-[576px]:max-[820px]:block max-[576px]:hidden min-[820px]:hidden max-w-[380px] flex-1">
              <Image
                src={hero_img}
                alt="Hero Image"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="w-[420px] shrink-0 max-[820px]:hidden">
          <Image src={hero_img} alt="Hero Image" />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
