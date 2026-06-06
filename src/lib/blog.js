import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function normalizeDate(value) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = normalizeDate(value);

  if (!date) return '';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function getReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 225));

  return `${minutes} min read`;
}

function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(file);
  const date = normalizeDate(data.date);

  return {
    slug,
    title: data.title || titleFromSlug(slug),
    excerpt: data.excerpt || '',
    date: formatDate(date),
    dateISO: date ? date.toISOString() : '',
    readingTime: getReadingTime(content),
    tags: Array.isArray(data.tags) ? data.tags : [],
    link: `/blog/${slug}`,
    content,
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => {
      const first = a.dateISO ? new Date(a.dateISO).getTime() : 0;
      const second = b.dateISO ? new Date(b.dateISO).getTime() : 0;
      return second - first;
    });
}
