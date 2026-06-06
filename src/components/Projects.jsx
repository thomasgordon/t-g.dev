'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Title from './ui/title';

const projects = [
  {
    id: '01',
    year: 'Now',
    name: 'TATYOU',
    description:
      'AR tattoo preview app, originally developed in Flutter for my dissertation and now being ported to React Native for a public release.',
    tech: ['React Native', 'Postgres', 'TypeScript', 'Stripe'],
    link: 'https://tatyou.app',
  },
  {
    id: '02',
    year: '2026',
    name: 't-g.dev',
    description:
      'The website you\'re on right now, written with React and TypeScript.',
    tech: ['React', 'TypeScript'],
    link: 'https://t-g.dev',
    githubLink: 'https://github.com/thomasgordon/t-g.dev',
  },
  {
    id: '03',
    year: '2026',
    name: 'Sorting Algorithms Visualiser',
    description:
      'A visualiser for sorting algorithms, because I love watching the videos of them!',
    tech: ['TypeScript'],
    link: 'https://t-g.dev/sorting',
  },
  {
    id: '04',
    year: '2023',
    name: 'Spotify Party System',
    description:
      'A web-based Spotify party system built before the feature existed natively, with song requests, skip voting, and a real-time queue.',
    tech: ['JavaScript', 'PHP', 'SQL', 'RESTful API'],
  },
];

function useRevealOnce(key) {
  const [shouldAnimate] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return window.sessionStorage.getItem(key) !== 'true';
  });

  const markSeen = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, 'true');
    }
  }, [key]);

  return { shouldAnimate, markSeen };
}

function ProjectLinks({ project }) {
  return (
    <div className="flex gap-2">
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 place-items-center rounded-full border border-hairline-2 text-text-muted hover:-translate-y-0.5 hover:border-almost-black hover:bg-almost-black hover:text-white"
          aria-label={`${project.name} GitHub repository`}
        >
          <Github size={16} />
        </a>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 place-items-center rounded-full border border-hairline-2 text-text-muted hover:-translate-y-0.5 hover:border-almost-black hover:bg-almost-black hover:text-white"
          aria-label={`${project.name} live site`}
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const reveal = useRevealOnce('tg-projects-revealed');

  return (
    <section id="projects" className="section-canvas px-4 py-20 sm:px-6 sm:py-24 md:py-36">
      <div className="container-custom">
        <motion.div
          initial={reveal.shouldAnimate ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          onViewportEnter={reveal.markSeen}
          className="mb-14 max-w-3xl"
        >
          <Title text="Some Projects" />
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-almost-black sm:text-4xl md:text-6xl">
            Things I've built.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg md:text-xl">
            A mix of products, tools, and experiments that I've built for fun, learning, and everything in between.
          </p>
        </motion.div>

        <motion.div
          initial={reveal.shouldAnimate ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          onViewportEnter={reveal.markSeen}
          className="border-t border-hairline"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative grid gap-4 border-b border-hairline py-7 transition-all duration-200 md:grid-cols-[3.5rem_1.25fr_1fr_auto] md:items-center md:gap-8 md:py-9 md:hover:px-4"
            >
              <span className="font-mono text-sm text-text-muted">{project.id}</span>
              <div>
                <h3 className="flex flex-wrap items-baseline gap-3 break-words text-2xl font-bold tracking-tight text-almost-black sm:text-3xl md:text-4xl">
                  {project.name}
                  <span className="font-mono text-sm font-medium text-text-muted">{project.year}</span>
                </h3>
                <div className="mt-4 flex flex-wrap gap-2 md:hidden">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-hairline-2 bg-white px-3 py-1 font-mono text-sm text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-base leading-relaxed text-text-muted sm:text-lg md:text-base">{project.description}</p>
              <div className="flex items-center justify-between gap-5">
                <ProjectLinks project={project} />
                {!project.link && !project.githubLink && (
                  <ArrowUpRight className="hidden text-text-muted opacity-0 transition-opacity group-hover:opacity-100 md:block" size={18} />
                )}
              </div>
              <div className="hidden flex-wrap gap-2 md:col-start-2 md:flex">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-hairline-2 bg-white px-3 py-1 font-mono text-sm text-text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
