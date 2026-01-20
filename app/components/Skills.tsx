"use client";

import { SkillsProps } from "../utils/types";
import { ParallaxText } from "./ui/ParallaxText";

function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills">
      <ParallaxText baseVelocity={-5}>
        {skills.map((skill) =>
            <span
              key={skill._id}
              className="md:text-7xl text-xl font-semibold uppercase text-white/30 tracking-tighter"
            >
              {skill.name} •
            </span>
          )}
      </ParallaxText>
      <ParallaxText baseVelocity={5}>
        {skills.map((skill) =>
            <span
              key={skill._id}
              className="md:text-7xl text-xl font-semibold uppercase text-white/30 tracking-tighter"
            >
              {skill.name} •
            </span>

        )}
      </ParallaxText>
      <ParallaxText baseVelocity={-5}>
        {skills.map((skill) =>
            <span
              key={skill._id}
              className="md:text-7xl text-xl font-semibold uppercase text-white/30 tracking-tighter"
            >
              {skill.name} •
            </span>

        )}
      </ParallaxText>
    </section>
  );
}

export default Skills;
