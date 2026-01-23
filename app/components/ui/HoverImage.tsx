"use client";

import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

import { HoverImageProps } from "../../utils/types";
import { trackLinkClick, trackProjectView } from "../../utils/events";

const MotionLink = motion.create(Link);

export const HoverImage = ({
  heading,
  imgSrc,
  shortDescription,
  projectDate,
  techStack,
  alias,
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

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const techTagVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
    >
      <MotionLink
        href={`/project/${alias}`}
        ref={ref}
        onMouseMove={handleMouseMove}
        onClick={() => {
          trackLinkClick(`/project/${alias}`, heading);
          trackProjectView(heading, alias);
        }}
        initial="initial"
        whileHover="whileHover"
        whileInView="animate"
        className="group relative flex items-center justify-between border-b border-white/10 py-4 transition-colors duration-500 md:py-6 md:px-16 hover:bg-white/5"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <motion.h4
              className="relative z-10 block text-2xl sm:text-4xl font-semibold md:font-bold md:text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl tracking-tighter"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {heading}
            </motion.h4>
          </div>
          <motion.span
            className="text-sm text-foreground/50 block"
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
          >
            {projectDate}
          </motion.span>
          <motion.p
            className="relative z-10 mt-2 block md:text-base text-sm text-foreground/50 transition-colors duration-500 group-hover:text-neutral-50 pt-2"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {shortDescription}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2 mt-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="text-xs text-foreground/50 bg-white/10 rounded-full px-2 py-1 cursor-pointer"
                variants={techTagVariants}
                custom={index}
                whileHover="hover"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.img
          style={{
            top,
            left,
            translateX: "-10%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
            whileHover: { 
              scale: 1, 
              rotate: "12.5deg",
              opacity: 1,
              filter: "brightness(1.1)",
            },
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          src={imgSrc}
          className="absolute z-999 h-40 w-56 rounded-lg object-cover md:h-80 md:w-[28rem] max-md:hidden shadow-2xl"
          alt={`Image representing a link for ${heading}`}
        />
      </MotionLink>
    </motion.div>
  );
};
