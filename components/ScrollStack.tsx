"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: React.ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div className={`${itemClassName}`.trim()}>
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: React.ReactNode;
  itemOffset?: number; // Distance between stacked cards headers
  topOffset?: number; // Initial top offset for the first card
}

const Card = ({
  children,
  index,
  total,
  offset,
  topOffset,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  offset: number;
  topOffset: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the card container relative to the viewport
  // "start start": when top of card hits top of viewport
  // "end start": when bottom of card hits top of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Dynamic transforms based on scroll position
  // As the card scrolls up and gets "stuck", scrollYProgress goes from 0 to 1
  // We scale it down slightly to create the depth effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Optional: Add a slight blur or opacity fade if desired, similar to extendi.it
  // const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(4px)"]);

  return (
    <div
      ref={containerRef}
      className="sticky flex flex-col items-center justify-center"
      style={{
        top: topOffset + index * offset,
        // Ensure the container is tall enough to allow scrolling through it
        // The height determines how long the card stays "stuck" before the next one fully covers it
        minHeight: "60vh",
        marginBottom: index === total - 1 ? "5vh" : "0",
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
          width: "100%",
          // filter,
        }}
        className="relative will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemOffset = 60,
  topOffset = 20,
}) => {
  const items = React.Children.toArray(children);

  return (
    <div className={`relative w-full ${className}`}>
      {items.map((child, index) => (
        <Card
          key={index}
          index={index}
          total={items.length}
          offset={itemOffset}
          topOffset={topOffset}
        >
          {child}
        </Card>
      ))}
    </div>
  );
};

export default ScrollStack;
