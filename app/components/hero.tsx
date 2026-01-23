"use client";

import Link from "next/link";

import { HeroProps } from "../utils/types";
import { SlideIn, Transition } from "./ui/Transitions";
import { Codepen, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Hero = ({ about }: HeroProps) => {
  const textRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!textRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
      setHeight(Math.round(entry.contentRect.height));
    });

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <Transition>
        <span className="blob size-1/2 absolute top-20 left-0 blur-[100px]" />
      </Transition>
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
            <div className="py-6 flex items-center flex-col text-center">
              <h2 className="md:text-7xl text-4xl font-bold overflow-hidden">
                <SlideIn>Hello! I&apos;m {about.name}</SlideIn>
              </h2>
              <h1 className="md:text-7xl text-3xl">
                <SlideIn className="overflow-visible!">
                  <span>Software </span>
                  <span className="pulsating-title relative" ref={textRef}>
                    <span className="developer-width w-1.5 h-1.5 bg-white absolute top-[-2px] left-[-2px]"/>
                    <span className="developer-width w-1.5 h-1.5 bg-white absolute bottom-[-2px] left-[-2px]"/>
                    <span className="developer-width w-1.5 h-1.5 bg-white absolute top-[-2px] right-[-2px]"/>
                    <span className="developer-width w-1.5 h-1.5 bg-white absolute bottom-[-2px] right-[-2px]"/>
                    Developer
                    <span className="developer-width absolute -bottom-6 left-[46%] text-[10px] bg-slate-50 text-slate-950 p-1 rounded-xs">{width}x{height}</span>
                  </span>
                </SlideIn>
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
              <div className="flex flex-col lg:flex-row items-start text-center max-xs:flex-col">
                <div className="flex align-center justify-center gap-2">
                  <Link href="https://github.com/santos16426" className="key-position" target="_blank">
                    <p className="key-tile p-4">
                      <Github size={32}/>
                    </p>
                  </Link>
                  <Link href="https://www.linkedin.com/in/billy-santos" className="key-position" target="_blank">
                    <p className="key-tile p-4">
                      <Linkedin size={32}/>
                    </p>
                  </Link>
                  <Link href="https://codepen.io/joe_lucas" className="key-position" target="_blank">
                    <p className="key-tile p-4">
                      <Codepen size={32}/>
                    </p>
                  </Link>
                </div>
                <div className="flex items-center justify-center w-full">
                  <Link
                    href="#about"
                    className=" key-position ml-2 w-full"
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
    </section>
  );
};

export default Hero;
