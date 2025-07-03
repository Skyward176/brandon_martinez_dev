'use client';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await addDoc(collection(db, 'blog'), {
        title,
        content,
        tags: tagsArray,
        createdAt: serverTimestamp(),
      });

      setTitle('');
      setContent('');
      setTags('');
      setMessage('Blog post created successfully!');
    } catch (error: any) {
      setMessage('Error creating blog post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-extralight text-teal-400 mb-6'>Create New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-white mb-2 font-medium'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
            placeholder='Enter blog post title...'
            required
          />
        </div>

        <div>
          <label className='block text-white mb-2 font-medium'>Tags</label>
          <input
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
            placeholder='Enter tags separated by commas (e.g., React, TypeScript, Web Development)'
          />
        </div>

        <div>
          <label className='block text-white mb-2 font-medium'>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className='w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none'
            placeholder='Write your blog post content here...'
            required
          />
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-900 border border-red-600 text-red-300' 
              : 'bg-green-900 border border-green-600 text-green-300'
          }`}>
            {message}
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Publishing...' : 'Publish Blog Post'}
        </button>
      </form>
    </div>
  );
}
