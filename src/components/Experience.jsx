'use client';

import React from 'react';
import { motion } from 'motion/react';
import Title from './ui/title';

const timelineData = [
  {
    period: 'Present',
    title: 'Software Engineer I',
    organization: 'Discovery Education',
    skills: ['Angular', 'TypeScript', 'Java', 'SQL'],
    description:
      'Contributing to educational technology solutions that empower teachers and engage students worldwide. Currently assisting in the localisation effort to increase the reach of DreamBox Maths.',
  },
  {
    period: '2022 - 2023',
    title: 'Software Engineering Intern',
    organization: 'Hewlett Packard Enterprise',
    skills: ['C++', 'Golang', 'Kubernetes', 'gRPC', 'SQL', 'Agile'],
    description:
      'Started my role with supporting an existing product. Transitioned to a cross-continental team spanning the UK, India, and the USA to help in the design and implementation of an upcoming product using Golang and Kubernetes.',
  },
  {
    period: '2020 - 2024',
    title: 'BSc Computer Science',
    organization: 'University of Portsmouth',
    skills: ['Python', 'Java', 'SQL', 'Flutter', 'AI/ML', 'Cybersecurity'],
    description:
      'Built a strong foundation across algorithms, data structures, distributed systems, ethical hacking, and artificial intelligence. My final-year dissertation - TATYOU - was an AR tattoo-previewing app built in Flutter.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-dark px-4 py-20 sm:px-6 sm:py-24 md:py-36">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <Title text="Experience & education" darkMode={true} />
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-6xl">
            Experience & education.
          </h2>
        </motion.div>

        <div className="border-t border-white/10">
          {timelineData.map((item, index) => (
            <motion.article
              key={`${item.period}-${item.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[8rem_1fr] md:gap-10 md:py-10"
            >
              <div className="font-mono text-sm uppercase tracking-wide text-text-light/55">
                {item.period}
              </div>
              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="break-words text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="font-medium text-accent-primary">{item.organization}</p>
                </div>
                <p className="mt-4 max-w-4xl text-base leading-relaxed text-text-light/70 sm:text-lg md:text-base">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-sm text-text-light/65"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
