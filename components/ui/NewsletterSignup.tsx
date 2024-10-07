"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl p-4 md:p-8 border border-white text-white">
      <h2 className="font-bold text-xl mb-4">Subscribe to Our Newsletter</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="firstname" className="text-white">
            First name
          </Label>
          <Input
            id="firstname"
            placeholder="John"
            type="text"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname" className="text-white">
            Last name
          </Label>
          <Input
            id="lastname"
            placeholder="Doe"
            type="text"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email" className="text-white">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="johndoe@example.com"
            type="email"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
