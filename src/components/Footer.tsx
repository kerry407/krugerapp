import Image from "next/image";
import fcb_combined_logo from "@/svgs/fcb-combined-logo.svg";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="max-w-[1000px] mx-auto my-12 text-[12.8px] flex flex-col items-center justify-center w-full text-center p-[20px]">
        <div className="my-4">
          <Image
            src={fcb_combined_logo}
            alt="fcb combined logo"
            className="w-full h-full object-contain max-w-[250px]"
          />
        </div>
        <div className="mb-[10px]">
          <a
            href="https://firstcarolinabank.com/bmtechnologies/privacy-policy"
            target="HO_privacy_popup"
            className="mx-[10px] text-link-color underline transition-colors duration-200 hover:no-underline"
          >
            Privacy Statement
          </a>
          <span className="text-accent-one-color">|</span>
          <a
            href="https://firstcarolinabank.com/bmtechnologies/privacy-policy"
            target="HO_privacy_popup"
            className="mx-[10px] text-link-color underline transition-colors duration-200 hover:no-underline"
          >
            Privacy Notice for California Residents
          </a>
        </div>
        <div className="text-neutral-primary py-4">
          <p className="leading-[24px]">
            © 2026 Powered by BM Technologies, Inc., a wholly owned subsidiary
            of First Carolina Bank, Member FDIC and Equal Housing Lender. All
            Rights Reserved.
          </p>
        </div>
        <div>
          <p className="text-primary leading-[24px]">
            BankMobile banking products and banking services are provided by
            First Carolina Bank, member FDIC & Equal Housing Lender. The
            BankMobile Debit Mastercard® card is issued by First Carolina Bank
            pursuant to license from Mastercard incorporated. The card is
            administered by First Carolina Bank. Mastercard and the Mastercard
            brand mark are registered trademarks of Mastercard International
            Incorporated. All other names and logos are owned by their
            respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
