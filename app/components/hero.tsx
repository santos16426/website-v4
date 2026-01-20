"use client";

import Link from "next/link";

import { HeroProps } from "../utils/types";
import { SlideIn, Transition } from "./ui/Transitions";
import LoaderWrapper from "./LoaderWrapper";
import { Codepen, Github, Linkedin } from "lucide-react";
import Image from "next/image";

const Hero = ({ about }: HeroProps) => {
  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      </Transition>
      <LoaderWrapper subTitle={about.subTitle}>
        <div className="relative h-full w-full">
          <div className="flex items-center justify-center flex-col h-full pb-10">
            <Transition>
              <Image
                width={112}
                height={112}
                src={about.avatar.url}
                alt={about.name}
                className="rounded-full size-28 object-cover"
              />
            </Transition>
            <div className="py-6 flex items-center flex-col">
              <h2 className="md:text-7xl text-4xl font-bold overflow-hidden">
                <SlideIn>Hello! I&apos;m {about.name}</SlideIn>
              </h2>
              <h1 className="md:text-7xl text-3xl overflow-hidden">
                <SlideIn>{about.title}</SlideIn>
              </h1>
            </div>
            <Transition viewport={{ once: true }} className="w-full">
              <p className="opacity-70 md:text-xl py-4 w-10/12 md:w-2/3 mx-auto flex flex-wrap justify-center gap-2">
                {about.subTitle.split(" ").map((word, index) => (
                  <span key={index}>{word}</span>
                ))}
              </p>
            </Transition>
            <Transition viewport={{ once: true }}>
              <div className="flex flex-row items-start text-center max-xs:flex-col">
                <div className="flex align-center justify-center gap-2">
                  <Link href="https://github.com/santos16426" className="key-position" target="_blank">
                    <Github className="key-tile p-4"/>
                  </Link>
                  <Link href="https://www.linkedin.com/in/billy-santos" className="key-position" target="_blank">
                    <Linkedin className="key-tile p-4"/>
                  </Link>
                  <Link href="https://codepen.io/joe_lucas" className="key-position" target="_blank">
                    <Codepen className="key-tile p-4"/>
                  </Link>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="#about"
                    className=" key-position ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                  <p className="key-cta">EXPLORE MORE</p>
                  </Link>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </LoaderWrapper>
    </section>
  );
};

export default Hero;
