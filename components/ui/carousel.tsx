"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export const CARD_WIDTH = 300;
export const CARD_HEIGHT = 500; // Updated to match the new card height
export const CARD_SPACING = 20;

export const Carousel = ({ items }: { items: JSX.Element[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    // Close any open cards
  });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <motion.div
        className="flex space-x-5"
        drag="x"
        dragConstraints={{
          right: 0,
          left: -((items.length - 1) * (CARD_WIDTH + CARD_SPACING)),
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 w-[${CARD_WIDTH}px] h-[${CARD_HEIGHT}px]`}
            initial={{ scale: 0.9, opacity: 0.7 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
