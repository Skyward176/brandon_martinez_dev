'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { HiLockClosed } from 'react-icons/hi2';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push('/blog/admin');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/blog/admin');
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className='bg-black h-full flex items-center justify-center'>
        <div className='text-white text-xl'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='bg-black h-full flex items-center justify-center'>
      <div className='bg-transparent p-8 rounded-lg border border-gray-700 w-full max-w-md'>
        <div className='flex items-center justify-center mb-6'>
          <HiLockClosed className='text-teal-400 text-3xl mr-2' />
          <h1 className='text-3xl font-extralight text-teal-400'>Admin Login</h1>
        </div>
        
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label className='block text-white mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
              required
            />
          </div>
          
          <div>
            <label className='block text-white mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
              required
            />
          </div>
          
          {error && (
            <div className='text-pink-400 text-sm border border-pink-400 rounded-lg p-2 bg-transparent'>
              {error}
            </div>
          )}
          
          <button
            type='submit'
            className='w-full py-2 bg-transparent border border-teal-400 text-teal-400 font-medium rounded-lg hover:bg-teal-400 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
