import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import { getAllPosts } from '@/lib/blog';

export default function MainPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <BlogSection posts={posts} />
      <Contact />
    </>
  );
}
