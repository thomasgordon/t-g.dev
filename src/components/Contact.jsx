'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import Title from './ui/title';

const contactMethods = [
  {
    name: 'Email',
    Icon: Mail,
    value: 'tomandrewgordon@gmail.com',
    href: 'mailto:tomandrewgordon@gmail.com',
    label: 'Send an email',
    external: false,
  },
  {
    name: 'GitHub',
    Icon: Github,
    value: 'github.com/thomasgordon',
    href: 'https://github.com/thomasgordon',
    label: 'Visit GitHub',
    external: true,
  },
  {
    name: 'LinkedIn',
    Icon: Linkedin,
    value: 'linkedin.com/in/thomasagordon',
    href: 'https://linkedin.com/in/thomasagordon',
    label: 'Connect on LinkedIn',
    external: true,
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

export default function Contact() {
  const reveal = useRevealOnce('tg-contact-revealed');

  return (
    <section id="contact" className="section-dark px-4 py-20 sm:px-6 sm:py-24 md:py-36">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <motion.div
            initial={reveal.shouldAnimate ? { opacity: 0, y: 24 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            onViewportEnter={reveal.markSeen}
          >
            <Title text="Get in touch" darkMode={true} />
            <h2 className="max-w-xl text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-7xl md:leading-[0.98]">
              Reach me on any of <span className="text-accent-primary">these.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={reveal.shouldAnimate ? { opacity: 0, x: 24 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            onViewportEnter={reveal.markSeen}
            className="flex flex-col gap-3"
          >
            {contactMethods.map(({ name, Icon, value, href, label, external }) => (
              <a
                key={name}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 hover:border-accent-primary hover:bg-white/[0.07] sm:gap-4 sm:rounded-2xl sm:p-5 md:hover:translate-x-1.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-almost-black text-white group-hover:border-accent-primary group-hover:text-accent-primary sm:h-12 sm:w-12">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-sm uppercase tracking-wider text-text-light/50">
                    {name}
                  </span>
                  <span className="mt-1 block break-words text-base font-semibold text-white [overflow-wrap:anywhere] sm:text-lg md:text-xl">
                    {value}
                  </span>
                </span>
                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-text-light/45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-primary"
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
