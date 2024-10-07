"use client";
import React, { useState } from "react";
import { SignupFormDemo } from "./NewsletterSignup";

export const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex h-14 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 font-semibold text-white text-lg transition-colors focus:outline-none active:border-0 active:outline-none"
      >
        Sign Up
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="float-right text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <SignupFormDemo />
          </div>
        </div>
      )}
    </>
  );
};
