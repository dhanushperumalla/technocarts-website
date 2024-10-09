"use client";
import React, { useState } from "react";
import { SignupFormDemo } from "./NewsletterSignup";

export const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignupSubmit = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Successfully subscribed to the newsletter!");
        setIsOpen(false); // Close the modal on successful submission
      } else {
        throw new Error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      // You might want to show an error message to the user here
    }
  };

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
            <SignupFormDemo onSubmit={handleSignupSubmit} />
          </div>
        </div>
      )}
    </>
  );
};
