"use client";

import { motion } from "motion/react";

import { ExperienceProps } from "../utils/types";
import { SectionHeading } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { BookUser } from "lucide-react";

const Timeline = ({ experience }: ExperienceProps) => {
  const exp = experience
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <div className="relative pb-20" id="experience">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <SectionHeading className="">
          <SlideIn className="text-white/40">
            <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
              <BookUser className="size-4" />
              <h2 className="text-sm font-medium tracking-wide max-sm:text-xs">Work History</h2>
            </div>
          </SlideIn>
        </SectionHeading>
      <div>
        {exp.map((exp, index) => (
          <Transition
            key={exp._id}
            className="py-4 md:py-8 border-b border-white/10 hover:bg-white/5 px-2 md:px-12"
          >
            <div className="flex items-center justify-between md:gap-8">
              <span className="max-md:hidden">0{index + 1}</span>
              <div className="md:text-5xl text-xl md:font-semibold flex-1">
                {exp.company_name}
              </div>
              <div className="max-md:text-sm flex-row text-foreground/50 max-md:hidden">
                <span className="italic">
                  {exp.startDate}
                </span>
                <span className="max-md:hidden">{" - "}</span>
                <span className="italic">
                  {exp.endDate}
                </span>
              </div>
            </div>
            <div className="md:pl-12 py-2 text-foreground/50 max-md:text-sm flex items-center justify-between">
              <span>{exp.jobTitle}</span>
              <span className="max-md:hidden">{exp.jobLocation}</span>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <p className="text-foreground/60 py-2">{exp.summary}</p>
              <ul className="list-disc list-inside">
                {exp.bulletPoints.map((point, index) => (
                  <li key={index} className="text-foreground/80 max-md:text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
