"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ContactProps } from "../utils/types";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { Mail } from "lucide-react";
import { trackContactSubmission, trackLinkClick } from "../utils/events";
const Contact = ({ email }: ContactProps) => {
  return (
    <motion.section className="relative pb-64" id="contact">
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px] -z-10" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">
            <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
              <Mail  className="size-4" />
              <h2 className="text-sm font-medium tracking-wide max-sm:text-xs">Contact me</h2>
            </div>
          </SlideIn>
        </SectionHeading>
        <div className="md:pt-16">
          <div className="flex flex-col items-center justify-center">
            <div className="pb-4 text-center">
              <Transition>
                <span className="text-white/90 text-4xl lg:text-8xl font-bold text-center">Have a project in mind?</span>
              </Transition>
              <div className="text-xl md:text-2xl font-bold py-2 items-center justify-center flex flex-row">
                <Transition className=" flex flex-col lg:flex-row lg:gap-2">
                  <span className="text-white/50">Drop me an email at </span>
                  <span  onClick={() =>(window.location.href = 'mailto:' + email) } className="cursor-pointer">
                    <TextReveal>{email}</TextReveal></span>
                </Transition>
              </div>
            </div>

          </div>
        </div>
      </div>
      <footer className="flex items-center justify-between md:px-8 px-2 py-4 text-sm absolute bottom-0 left-0 right-0">
        <Transition>
          <div>&copy; {new Date().getFullYear()} Lucas</div>
        </Transition>
        <Transition>
          <p>
            developed by @
            <Link
              href={"https://www.linkedin.com/in/billy-santos/"}
              className="hover:underline"
              onClick={() => trackLinkClick("https://www.linkedin.com/in/billy-santos/", "Developer Link")}
            >
              lucas
            </Link>
          </p>
        </Transition>
      </footer>
    </motion.section>
  );
};

export default Contact;
