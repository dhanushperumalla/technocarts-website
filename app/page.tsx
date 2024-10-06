"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Initiatives",
    link: "/initiatives",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
];

const words = [
  {
    text: "Welcome",
    className: "text-white",
  },
  {
    text: "to",
    className: "text-white",
  },
  {
    text: "TechnoCarts",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function Home() {
  return (
    <div className="h-[200vh] bg-black">
      {/* <-- Hero Section --> */}
      <AuroraBackground className="h-screen">
        <div className="relative w-full h-screen">
          {/* FloatingNav positioned at the top */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <FloatingNav navItems={navItems} />
          </div>

          {/* Larger logo in top left corner */}
          <div className="absolute top-6 left-6 z-40">
            <div className="relative inline-flex h-16 overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-xl font-bold text-white backdrop-blur-3xl">
                TechnoCarts
              </span>
            </div>
          </div>

          {/* Centered TypewriterEffect and Join Button */}
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <TypewriterEffect words={words} />
            <button className="inline-flex h-14 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-10 font-semibold text-white text-lg transition-colors focus:outline-none active:border-0 active:outline-none">
              Join Now
            </button>
          </div>
        </div>
      </AuroraBackground>
      {/*  <-- Initiatives Section --> */}
      <div className="h-screen bg-slate-900">
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl font-bold text-white">Our Initiatives</h2>
        </div>
      </div>
    </div>
  );
}
