'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BlogPost from "./components/BlogPost";

function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener for blog collection with ordering
    const q = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setBlogPosts(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='bg-black min-h-screen text-white p-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-5xl font-extralight text-teal-400 text-center mb-8'>Blog</h1>
          <div className='text-center text-gray-400 mt-16'>
            <p className='text-xl'>Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-5xl font-extralight text-teal-400 text-center mb-8'>Blog</h1>
        
        {blogPosts.length > 0 ? (
          <div className='space-y-8'>
            {blogPosts.map((post: any) => (
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
