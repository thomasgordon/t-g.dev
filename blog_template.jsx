'use client'

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const BlogPost = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 sm:px-8 max-w-4xl mx-auto"
    >
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blog">
          <button className="flex items-center text-accent-colour hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to blog
          </button>
        </Link>
      </div>

      {/* Blog header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-text-colour">
          Blog Post Title
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {/* Replace with your actual tags */}
          <span className="px-3 py-1 bg-accent-colour text-secondary-colour rounded-full">Tag 1</span>
          <span className="px-3 py-1 bg-accent-colour text-secondary-colour rounded-full">Tag 2</span>
        </div>
        <p className="text-text-colour opacity-75">Published on YYYY-MM-DD</p>
      </div>

      {/* Optional feature image */}
      <div className="mb-10 rounded-lg overflow-hidden">
        {/* Uncomment and update src when you have an image 
        <Image 
          src="/path/to/your/image.jpg" 
          alt="Blog post featured image" 
          width={1200} 
          height={675} 
          className="w-full h-auto"
        />
        */}
      </div>

      {/* Blog content */}
      <div className="prose prose-lg max-w-none text-text-colour">
      </div>

      {/* Author section */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex items-center">
          {/* Uncomment and update src when you have an avatar 
          <Image 
            src="/path/to/your/avatar.jpg" 
            alt="Author" 
            width={60} 
            height={60} 
            className="rounded-full mr-4"
          />
          */}
          <div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BlogPost; 
