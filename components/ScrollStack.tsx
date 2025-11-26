/**
 * ScrollStack component to create a scrollable stack of items with scaling and transformation effects.
 * Optimized for performance using native scroll events with requestAnimationFrame throttling.
 * Fixed flickering on mobile by throttling updates and minimizing heavy CSS filters.
 * 
 * @param {ScrollStackProps} props - The properties for configuring the ScrollStack behavior and appearance.
 * @returns {JSX.Element} The ScrollStack component.
 */

"use client";

import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

interface TransformState {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full origin-top will-change-transform ${itemClassName}`.trim()}
    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, TransformState>());
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const parsePercentage = useCallback((value: string, height: number) => {
    return (parseFloat(value) / 100) * height;
  }, []);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!containerRef.current || !cardsRef.current.length) return;

    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollTop = window.scrollY - containerTop;
    const containerHeight = window.innerHeight;

    const stackPosPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPx = parsePercentage(scaleEndPosition, containerHeight);

    const endEl = container.querySelector(".scroll-stack-end") as HTMLElement | null;
    const endTop = endEl ? endEl.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.offsetTop;

      const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;

      const pinStart = triggerStart;
      const pinEnd = endTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      // Disable blur on mobile to prevent flickering
      if (blurAmount && window.innerWidth > 768) {
        let topIdx = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTop = cardsRef.current[j].offsetTop;
          const jTriggerStart = jTop - stackPosPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topIdx = j;
        }
        if (i < topIdx) blur = Math.max(0, (topIdx - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      const newTransform = { translateY, scale, rotation, blur };
      const last = lastTransformsRef.current.get(i);

      if (
        !last ||
        Math.abs(last.translateY - translateY) > 0.5 ||
        Math.abs(last.scale - scale) > 0.001 ||
        Math.abs(last.rotation - rotation) > 0.5 ||
        Math.abs(last.blur - blur) > 0.5
      ) {
        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        card.style.filter = blur ? `blur(${blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        if (isPinned && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isPinned && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    tickingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    calculateProgress,
    parsePercentage,
    onStackComplete,
  ]);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.willChange = "transform";

    const cards = Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
    });

    // Initial update
    updateCardTransforms();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lastTransformsRef.current.clear();
      cardsRef.current = [];
    };
  }, [itemDistance, updateCardTransforms, handleScroll]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner bg-background">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
