"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import bm_logo from "@/svgs/bm_logo.svg";
import arrow_down from "@/svgs/arrow_down.svg";
import menu from "@/svgs/menu.svg";
import blue_arrow_down from "@/svgs/blue_arrow_down.svg";
import blue_menu from "@/svgs/blue_menu.svg";

const navLinks = [
  { text: "I Need a Code", href: "#code" },
  { text: "What is a refund?", href: "#refund" },
  { text: "A few of our partner schools", href: "#schools" },
  { text: "About us", href: "#about" },
];

const Topbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`h-[96px] w-full fixed top-0 z-999 left-0 flex items-center justify-between py-[12px] px-6 min-[576px]:px-[82px] transition-all duration-300 ease-in-out bg-white ${isScrolled ? "shadow-[0_2px_4px_rgba(0,0,0,0.2)]" : ""}`}
      >
        <Link
          href="#"
          className="max-w-[131px] min-[576px]:max-w-[200px] inline-block relative z-50"
        >
          <Image src={bm_logo} alt="Logo" />
        </Link>

        <div className="flex items-center max-[576px]:hidden relative z-50">
          <button
            type="button"
            className="bg-accent-two-color border border-accent-two-color hover:bg-opacity-90 transition-all text-white py-[4px] px-[12px]"
          >
            Login
          </button>
          <span className="px-[8px] text-[30px] text-accent-two-color">|</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-[8px] font-bold text-accent-two-color cursor-pointer transition-colors"
          >
            <Image
              src={isMenuOpen ? blue_arrow_down : arrow_down}
              alt="Arrow Down"
            />
            On this page
          </button>
        </div>

        <div className="min-[576px]:hidden relative z-50">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-[8px] font-bold text-accent-two-color cursor-pointer transition-colors"
          >
            <Image src={isMenuOpen ? blue_menu : menu} alt="Menu" />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Dropdown Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[96px] bg-white/60 backdrop-blur-md z-990"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Menu Items */}
          <div className="fixed top-[96px] right-6 min-[576px]:right-[82px] z-995 flex flex-col items-end gap-[10px] pt-6 animate-in slide-in-from-top-4 fade-in duration-200">
            {/* Mobile-only elements */}
            <div className="flex flex-col items-end gap-[12px] min-[576px]:hidden w-full mb-2">
              <button className="bg-accent-two-color text-white py-[8px] px-[24px] font-medium transition-colors hover:bg-opacity-90">
                Login
              </button>
              <h4 className="text-neutral-primary font-bold text-[18px] opacity-80 mt-2">
                On this page
              </h4>
            </div>

            {/* Links */}
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent-two-color hover:bg-accent-one-color active:bg-accent-one-color text-white font-medium py-[8px] px-[16px] text-right transition-colors shadow-sm"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Topbar;
