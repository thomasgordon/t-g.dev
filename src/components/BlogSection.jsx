'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Title from './ui/title';

export default function BlogSection({ posts = [] }) {
  return (
    <section id="blog" className="section-white px-4 py-20 sm:px-6 sm:py-24 md:py-36">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <Title text="Blog" />
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-almost-black sm:text-4xl md:text-6xl">
              Blog posts.
            </h2>
            <p className="mt-5 text-base text-text-muted sm:text-lg md:text-xl">
              Sharing my ramblings? I guess?
            </p>
          </div>
        </motion.div>

        <div className="border-t border-hairline">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={post.link}
                className="group grid gap-3 border-b border-hairline py-7 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-10"
              >
                <span className="font-mono text-sm text-text-muted">{post.date}</span>
                <span>
                  <h3 className="break-words text-2xl font-bold tracking-tight text-almost-black transition-colors group-hover:text-accent-tertiary md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg md:text-base">{post.excerpt}</p>
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-sm text-text-muted">
                  Read
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
