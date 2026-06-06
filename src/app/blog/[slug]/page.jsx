import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post not found | Tom Gordon',
    };
  }

  return {
    title: `${post.title} | Tom Gordon`,
    description: post.excerpt,
  };
}

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mt-12 break-words text-3xl font-bold leading-tight tracking-tight text-almost-black sm:text-4xl md:mt-14 md:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <section className="mt-12 border-t border-hairline pt-8 md:mt-16 md:pt-10">
      <h2 className="break-words text-3xl font-bold leading-tight tracking-tight text-almost-black md:text-4xl">
        {children}
      </h2>
    </section>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 flex items-start gap-3 break-words text-xl font-bold leading-tight tracking-tight text-almost-black sm:text-2xl md:mt-12">
      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-primary shadow-[0_0_0_5px_rgba(255,194,198,0.28)]" />
      <span>{children}</span>
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 break-words text-base leading-8 text-text-dark sm:text-[1.05rem] md:mt-6 md:text-lg md:leading-9">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');

    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="break-words font-semibold text-accent-tertiary underline decoration-accent-primary underline-offset-4 hover:text-almost-black"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-6 overflow-hidden border-y border-hairline text-base text-text-dark sm:text-[1.02rem] md:mt-7 md:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-3 border-l border-hairline pl-6 text-base leading-8 text-text-dark sm:pl-8 sm:text-[1.02rem] md:mt-7 md:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="relative list-none break-words border-b border-hairline py-3 pl-6 leading-8 before:absolute before:left-0.5 before:top-[1.45rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-tertiary last:border-b-0 sm:pl-8 sm:before:left-1">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-4 border-accent-primary bg-surface py-4 pl-5 pr-4 text-lg font-semibold leading-8 text-almost-black sm:text-xl md:mt-10 md:py-5 md:pl-6 md:pr-5">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="mt-8 overflow-x-auto rounded-lg border border-hairline bg-background-secondary p-4 text-sm leading-6 text-text-light md:mt-10 md:p-5">
      {children}
    </pre>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="rounded border border-hairline bg-background-primary px-1.5 py-0.5 text-sm font-semibold text-almost-black">
        {children}
      </code>
    ) : (
      <code>{children}</code>
    ),
  strong: ({ children }) => <strong className="font-bold text-almost-black">{children}</strong>,
  em: ({ children }) => <em className="font-medium text-almost-black">{children}</em>,
  hr: () => <hr className="my-12 border-hairline" />,
  table: ({ children }) => (
    <div className="mt-8 w-full overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-text-dark">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => <th className="border border-hairline bg-background-primary px-3 py-3 font-semibold sm:px-4">{children}</th>,
  td: ({ children }) => <td className="border border-hairline px-3 py-3 align-top sm:px-4">{children}</td>,
};

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-background-primary px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 md:pb-36 md:pt-40">
      <div className="container-custom">
        <Link
          href="/#blog"
          className="mx-auto mb-12 flex w-fit items-center gap-2 rounded-full border border-hairline-2 px-4 py-2 text-sm font-semibold text-almost-black hover:-translate-y-0.5 hover:border-almost-black md:mx-0 md:mb-14"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <header className="mx-auto max-w-3xl pb-10 text-center md:pb-12 md:text-left">
          <div className="mx-auto mb-6 h-1.5 w-20 rounded-full bg-accent-primary md:mx-0 md:mb-7 md:w-24" />
          <div className="mb-5 flex flex-wrap justify-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-text-muted sm:gap-3 sm:text-xs sm:tracking-[0.12em] md:justify-start">
            <span>{post.date}</span>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="break-words text-4xl font-bold leading-[1.02] tracking-tight text-almost-black sm:text-5xl md:text-7xl md:leading-[0.98]">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl md:mx-0 md:mt-7">
              {post.excerpt}
            </p>
          ) : null}
        </header>

        <div className="mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
