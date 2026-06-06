'use client';

import React from 'react';
import { motion } from 'motion/react';
import Title from './ui/title';

const skills = ['Python', 'TypeScript', 'React', 'SQL', 'Linux', 'Tailwind', 'Go', 'Docker'];

const now = [
  ['Currently', 'Software Engineer at Discovery Education'],
  ['Focus', 'Typescript, React Native, SQL and Java'],
  ['Away from the keyboard', 'Drums, piano, guitar and home servers'],
];

export default function About() {
  return (
    <section id="about" className="section-white px-4 py-20 sm:px-6 sm:py-24 md:py-36">
      <div className="container-custom">
        <div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <Title text="About" />
            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-almost-black sm:text-4xl md:text-5xl">
              I'm a software engineer who likes building things people enjoy using.
            </h2>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-text-muted sm:text-lg md:text-xl">
              <p>
                I'm a software engineer with a BSc in Computer Science and a passion for technology.
                I enjoy solving complex problems and building useful, thoughtful software.
              </p>
              <p>
                My technical foundation spans Python, TypeScript, SQL, and React. I've developed full react native
                applications, machine learning models, and enterprise software. My experience at
                Hewlett Packard Enterprise gave me exposure to Go, Kubernetes, and Docker, 
                while my work at Discovery Education has allowed me to work with Typescript, Java and SQL.
              </p>
            </div>

            <dl className="mt-9 grid gap-x-5 gap-y-4 sm:grid-cols-[auto_1fr] sm:gap-y-3">
              {now.map(([label, value]) => (
                <React.Fragment key={label}>
                  <dt className="font-mono text-sm text-text-muted">{label}</dt>
                  <dd className="m-0 break-words font-medium text-almost-black">{value}</dd>
                </React.Fragment>
              ))}
            </dl>

            <div className="mt-10">
              <Title text="Skills" />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-hairline-2 bg-white px-3 py-1.5 font-mono text-sm font-medium text-text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
