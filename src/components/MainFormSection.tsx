"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const MainFormSection = () => {
  const [personalCode, setPersonalCode] = useState("");
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleGetStarted = (e: React.SubmitEvent) => {
    e.preventDefault();
    // handle personal code submission
  };

  const handleRequestCode = (e: React.SubmitEvent) => {
    e.preventDefault();
    // handle personal code request submission
  };

  return (
    <section
      id="code"
      className="max-w-[570px] w-[90%] mx-auto my-10 relative space-y-6"
    >
      <div className="mb-6">
        <p className="text-neutral-primary font-bold leading-[24px]">
          To avoid any delays in accessing your money, you must select a refund
          option.<sup className="font-normal">1</sup> To get started, enter the
          personal code you should have received from us in the mail in a green
          envelope or in an email.
        </p>
        <p className="text-neutral-primary text-[0.8rem] leading-[24px] mt-2">
          <sup>1</sup> The BankMobile Checking account is one of your refund
          options but you are not required to open this account to receive your
          refund.
        </p>
      </div>

      <div className="bg-white rounded-[2px] p-4 shadow-[0_1px_5px_0px_#0000001a]">
        <form onSubmit={handleGetStarted} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="personalCode"
              placeholder=" "
              value={personalCode}
              onChange={(e) => setPersonalCode(e.target.value)}
              className="font-sailec peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors"
            />
            <label
              htmlFor="personalCode"
              className="font-sailec absolute text-neutral-primary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none"
            >
              Your personal code
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-one-color hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0.0)_100%)] text-accent-two-color py-4 rounded-[2px] text-base font-medium hover:bg-[#b8d9f0] transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Get started
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {}}
            type="button"
            disabled={true}
            className="w-full bg-transparent hover:bg-[linear-gradient(180deg,white_0%,white_25%,rgba(0,0,0,0.20)_100%)] text-accent-two-color py-4 rounded-[2px] text-base font-medium hover:bg-[#b8d9f0] transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Have a username/password? Log in
          </button>
        </div>
      </div>

      {/* "I need a code" Accordion */}
      <div className="bg-white rounded-[2px] shadow-[0_1px_5px_0px_#0000001a]">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => setAccordionOpen((prev) => !prev)}
          className="w-full flex justify-between items-center px-4 pt-4 pb-6 text-left cursor-pointer"
        >
          <span className="font-bold text-primary text-lg font-museo-slab ml-1">
            I need a code
          </span>
          <span className="text-primary text-lg leading-none mr-1">
            {accordionOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>

        {/* Accordion Content */}
        {accordionOpen && (
          <div className="px-4 pb-4">
            <div className="mb-6">
              <h3 className="font-bold text-primary text-lg font-museo-slab mb-4">
                It&apos;s an easy process
              </h3>
              <ol className="list-decimal list-outside pl-4 text-[#333] text-base leading-[24px]">
                <li>
                  Get started by requesting your personal code. Why is this
                  needed? To confirm you are a student at your college or
                  university.
                </li>
                <li>
                  Your code will be emailed to you. Come back and enter it to
                  select your refund method.
                </li>
              </ol>

              <p className="mt-6 text-neutral-primary text-base leading-[24px] font-semibold">
                For your security, please provide us with the information below.
              </p>
            </div>

            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="schoolName"
                  placeholder=" "
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors"
                />
                <label
                  htmlFor="schoolName"
                  className="absolute text-neutral-primary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none"
                >
                  School name
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="studentId"
                  placeholder=" "
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors"
                />
                <label
                  htmlFor="studentId"
                  className="absolute text-neutral-primary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none"
                >
                  Student ID number
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="schoolEmail"
                  placeholder=" "
                  value={schoolEmail}
                  onChange={(e) => setSchoolEmail(e.target.value)}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors"
                />
                <label
                  htmlFor="schoolEmail"
                  className="absolute text-neutral-primary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none"
                >
                  School email
                </label>
              </div>
              <div className="relative">
                <input
                  type="date"
                  id="dateOfBirth"
                  placeholder=" "
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors"
                />
                <label
                  htmlFor="dateOfBirth"
                  className="absolute text-neutral-primary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none"
                >
                  Date of birth
                </label>
              </div>
              <button
                type="submit"
                disabled={true}
                className="disabled:cursor-not-allowed disabled:opacity-50 w-full border-2 border-accent-two-color text-accent-two-color bg-white py-4 rounded-[2px] text-base font-medium hover:bg-[linear-gradient(180deg,white_0%,white_25%,rgba(0,0,0,0.20)_100%)] transition-all duration-300 ease-in-out cursor-pointer"
              >
                Request my personal code
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainFormSection;
