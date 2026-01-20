"use client";

import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

import { HoverImageProps } from "../../utils/types";

const MotionLink = motion.create(Link);

export const HoverImage = ({
  heading,
  imgSrc,
  shortDescription,
  projectDate,
  techStack,
}: HoverImageProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <MotionLink
      href={"#"}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/10 py-4 transition-colors duration-500 md:py-6 md:px-16 hover:bg-white/5"
    >
      <div>
        <div className="flex items-center justify-between">
          <h4 className="relative z-10 block text-2xl sm:text-4xl font-semibold md:font-bold md:text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl tracking-tighter">
            {heading}
          </h4>
        </div>
        <span className="text-sm text-foreground/50">
        {projectDate}
        </span>
        <p className="relative z-10 mt-2 block md:text-base text-sm text-foreground/50 transition-colors duration-500 group-hover:text-neutral-50 pt-2">
          {shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
        {
          techStack.map((tech) => (
            <span key={tech} className="text-xs text-foreground/50 bg-white/10 rounded-full px-2 py-1">
              {tech}
            </span>
          ))
        }
        </div>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-10%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-999 h-40 w-56 rounded-lg object-cover md:h-80 md:w-112 max-md:hidden"
        alt={`Image representing a link for ${heading}`}
      />

    </MotionLink>
  );
};
