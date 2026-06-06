'use client';

import { GeistSans } from 'geist/font/sans';
import './globals.css';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import Link from 'next/link';

const NAV_SECTIONS = ['about', 'experience', 'projects', 'blog'];
const MOBILE_SECTIONS = [...NAV_SECTIONS, 'contact'];
const ALL_SECTIONS = ['hero', ...MOBILE_SECTIONS];

export default function RootLayout({ children }) {
  const [isOpen, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min(window.scrollY / totalHeight, 1) : 0);
      setHasScrolled(window.scrollY > 20);

      for (const id of [...ALL_SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <html lang="en">
      <body className={`${GeistSans.className} bg-background-primary text-text-dark`}>
        <div className="fixed left-0 right-0 top-0 z-50 h-0.5">
          <motion.div
            className="h-full bg-accent-tertiary"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <header
          className={`fixed left-0 top-0 z-40 w-full border-b px-4 transition-all duration-300 sm:px-6 ${
            hasScrolled
              ? 'border-hairline bg-background-primary/90 backdrop-blur-md'
              : 'border-transparent bg-background-primary/75 backdrop-blur-md'
          }`}
        >
          <div className="container-custom mx-auto flex h-[68px] items-center justify-between">
            <Link
              href="/#hero"
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-almost-black hover:text-accent-tertiary"
            >
              <span className="h-3 w-3 rounded-full bg-accent-primary shadow-[0_0_0_4px_rgba(255,194,198,0.35)]" />
              t-g.dev
            </Link>

            <nav className="hidden items-center md:flex">
              <div className="flex items-center gap-7">
                {NAV_SECTIONS.map((section) => (
                  <Link
                    key={section}
                    href={`/#${section}`}
                    className="group relative py-1 text-sm font-medium capitalize text-text-muted hover:text-almost-black"
                  >
                    <span className={activeSection === section ? 'text-almost-black' : ''}>
                      {section}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-accent-tertiary transition-all duration-200 ${
                        activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  className="rounded-full border border-hairline-2 px-4 py-2 text-sm font-semibold text-almost-black hover:-translate-y-0.5 hover:border-almost-black"
                >
                  Get in touch
                </Link>
              </div>
            </nav>

            <button
              className="rounded-full border border-hairline-2 p-2 text-text-muted hover:border-almost-black hover:text-almost-black md:hidden"
              onClick={() => setOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background-secondary"
            >
              <button
                className="absolute right-6 top-6 rounded-full border border-white/10 p-2 text-white/60 hover:border-accent-primary hover:text-accent-primary"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              <nav className="flex flex-col items-center gap-6">
                {MOBILE_SECTIONS.map((section, i) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      href={`/#${section}`}
                      onClick={() => setOpen(false)}
                    className={`text-3xl font-bold capitalize transition-colors duration-200 sm:text-4xl ${
                        activeSection === section ? 'text-accent-primary' : 'text-white hover:text-accent-primary'
                      }`}
                    >
                      {section}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-10 flex gap-5"
              >
                <a
                  href="https://github.com/thomasgordon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-accent-primary"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/thomasagordon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-accent-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className={isOpen ? 'pointer-events-none' : ''}>{children}</main>

        <footer className="border-t border-white/10 bg-background-secondary px-4 py-10 sm:px-6">
          <div className="container-custom mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Tom Gordon
            </p>
            <div className="flex gap-5">
              <a
                href="https://github.com/thomasgordon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/thomasagordon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
