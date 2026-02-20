"use client";

import Image from "next/image";

import { AboutProps } from "../utils/types";
import { OpacityTextReveal, SlideIn, Transition } from "./ui/Transitions";
import Maps from "./ui/Maps";
import MusicPlayer from "./ui/MusicPlayer";
import BouncingHobbies from "./ui/BouncingHobbies";

const About = ({ about }: AboutProps) => {
  return (
    <section
      className="grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-20 px-4 md:px-8 relative"
      id="about"
    >
      <div>
        <h3 className="md:text-5xl text-2xl font-bold overflow-hidden uppercase pb-8">
          <SlideIn>
            <OpacityTextReveal>{about.quote}</OpacityTextReveal>
          </SlideIn>
        </h3>
        <Transition
          viewport={{ once: true }}
          className="md:text-4xl tracking-tighter"
        >
          <OpacityTextReveal>{about.description}</OpacityTextReveal>
        </Transition>
        <Transition className="mt-8" viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-fr">
            {about.address && (
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 md:row-span-2">
                <div className="w-full h-full min-h-[200px] md:min-h-[400px] rounded-lg overflow-hidden">
                  <Maps />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors" />
              </div>
            )}
            {about.music && (
              <MusicPlayer />
            )}
            {about.hobby && about.hobbies && (
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 min-h-[200px]">
                <div className="text-xs uppercase tracking-wider text-foreground/50 mb-4">Hobby</div>
                <BouncingHobbies hobbies={about.hobbies} />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors" />
              </div>
            )}
          </div>
        </Transition>
      </div>
      <div className="relative">
        <div className="sticky top-6">
          <Transition>
            <Image
              src={about.avatar.url}
              width={1000}
              height={400}
              alt={about.name}
              className="rounded-xl max-md:aspect-square object-cover mt-2 lg:mt-0"
            />
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default About;
