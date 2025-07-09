'use client';

import { useBlogPosts } from '@/hooks/useQueries';
import BlogPost from "./components/BlogPost";

function Blog() {
  const { data: blogPosts = [], isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div className='bg-black text-gray-100 p-8 h-full'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-5xl font-extralight text-teal-400 text-center mb-8'>Blog</h1>
          <div className='text-center text-gray-400 mt-16'>
            <p className='text-xl'>Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-black text-gray-100 p-8 h-full'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-5xl font-extralight text-teal-400 text-center mb-8'>Blog</h1>
          <div className='text-center text-red-400 mt-16'>
            <p className='text-xl'>Error loading blog posts. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort posts by creation date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      const aTime = a.createdAt.seconds ? a.createdAt.seconds : new Date(a.createdAt).getTime() / 1000;
      const bTime = b.createdAt.seconds ? b.createdAt.seconds : new Date(b.createdAt).getTime() / 1000;
      return bTime - aTime;
    }
    return 0;
  });

  return (
    <div className='bg-black text-gray-100 p-8 pb-16 h-full overflow-auto'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-5xl font-extralight text-teal-400 text-center mb-8'>Blog</h1>
        
        {sortedPosts.length > 0 ? (
          <div className='space-y-8 pb-8'>
            {sortedPosts.map((post) => (
              <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-400 mt-16'>
            <p className='text-xl'>No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog;
