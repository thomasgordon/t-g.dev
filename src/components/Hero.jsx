'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const phrases = [
  'am building TATYOU.',
  'make random side projects.',
  'have servers in my wardrobe.',
  'play drums, piano, and guitar.',
];

const socialLinks = [
  { Icon: Github, href: 'https://github.com/thomasgordon', label: 'GitHub', external: true },
  { Icon: Linkedin, href: 'https://linkedin.com/in/thomasagordon', label: 'LinkedIn', external: true },
  { Icon: Mail, href: 'mailto:tomandrewgordon@gmail.com', label: 'Email', external: false },
];

function useRotatingType(words, speed = 52, pause = 1300) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = words[phraseIndex];
    const doneTyping = !deleting && letterIndex === phrase.length;
    const doneDeleting = deleting && letterIndex === 0;
    const delay = doneTyping ? pause : deleting ? speed * 0.55 : speed;

    const timeout = setTimeout(() => {
      if (doneTyping) {
        setDeleting(true);
        return;
      }

      if (doneDeleting) {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % words.length);
        return;
      }

      setLetterIndex((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [deleting, letterIndex, phraseIndex, pause, speed, words]);

  return words[phraseIndex].slice(0, letterIndex);
}

export default function Hero() {
  const typed = useRotatingType(phrases);

  return (
    <section
      id="hero"
      className="section-canvas relative flex min-h-[100svh] items-start overflow-hidden px-4 pb-20 pt-28 sm:px-6 md:items-center md:py-24"
    >
      <div className="pointer-events-none absolute right-[8%] top-28 hidden h-64 w-64 rounded-full bg-accent-primary/80 blur-[2px] md:block" />
      <div className="pointer-events-none absolute bottom-24 right-[22%] hidden h-28 w-28 rounded-full bg-accent-secondary/80 blur-[2px] md:block" />
      <div className="pointer-events-none absolute right-[42%] top-[42%] hidden h-14 w-14 rounded-full bg-accent-tertiary/80 blur-[2px] md:block" />

      <div className="container-custom relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl break-words text-4xl font-extrabold leading-[1.02] tracking-tight text-almost-black sm:text-6xl sm:leading-[0.98] md:text-7xl lg:text-[6.35rem]"
        >
          Hi, I'm
          <br />
          <span className="text-accent-primary">Tom Gordon</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="mt-5 min-h-[4.5rem] text-xl font-semibold leading-tight tracking-tight text-text-muted sm:min-h-[3rem] sm:text-3xl md:text-[2.35rem]"
        >
          and I {' '}
          <span className="text-almost-black">{typed}</span>
          <span className="ml-1 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.16em] animate-blink bg-accent-tertiary" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg md:text-xl"
        >
          BSc Computer Science graduate and Software Engineer at Discovery Education.
          Also interested in music, home servers, and all things technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.48 }}
          className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Link
            href="#projects"
            className="inline-flex justify-center items-center gap-2 rounded-full bg-almost-black px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:shadow-lg sm:w-fit"
          >
            See my work
            <ArrowUpRight size={16} />
          </Link>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline-2 text-text-muted hover:-translate-y-0.5 hover:border-almost-black hover:text-almost-black"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent-tertiary"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
