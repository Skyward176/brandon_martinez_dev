'use client';
import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function HomepageEditor() {
  const [about, setAbout] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadHomepageContent();
  }, []);

  const loadHomepageContent = async () => {
    try {
      const docRef = await getDocs(collection(db, 'homepage'));
      const data = docRef.docs.map((doc) => doc.data());
      if (data[0]) {
        setAbout(data[0].about || '');
        setImageSrc(data[0].image?.src || '');
      }
    } catch (error: any) {
      setMessage('Error loading homepage content: ' + error.message);
    }
  };

  const saveContent = async () => {
    setLoading(true);
    setMessage('');

    try {
      const docRef = await getDocs(collection(db, 'homepage'));
      if (docRef.docs.length > 0) {
        await updateDoc(doc(db, 'homepage', docRef.docs[0].id), {
          about: about,
          image: {
            src: imageSrc
          }
        });
        setMessage('Homepage content updated successfully!');
      }
    } catch (error: any) {
      setMessage('Error updating content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-extralight text-teal-400 mb-6'>Edit Homepage Content</h2>
      
      <div className='space-y-6'>
        <div>
          <label className='block text-white mb-2 font-medium'>About Me Text</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={6}
            className='w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none'
            placeholder='Write your about me content here...'
          />
        </div>

        <div>
          <label className='block text-white mb-2 font-medium'>Profile Image Source</label>
          <input
            type='text'
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            className='w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
            placeholder='Enter image path (e.g., /portfolio/profile)'
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
          onClick={saveContent}
          disabled={loading}
          className='w-full py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Saving...' : 'Save Homepage Content'}
        </button>
      </div>
    </div>
  );
}
