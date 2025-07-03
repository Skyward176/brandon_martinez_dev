'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AdminDashboard from './components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className='bg-black min-h-screen flex items-center justify-center'>
        <div className='text-white text-xl'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='bg-black min-h-screen flex items-center justify-center'>
        <div className='bg-gray-900 p-8 rounded-lg border border-gray-700 w-full max-w-md'>
          <h1 className='text-3xl font-extralight text-teal-400 text-center mb-6'>Admin Login</h1>
          
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-white mb-2'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
                required
              />
            </div>
            
            <div>
              <label className='block text-white mb-2'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
                required
              />
            </div>
            
            {error && (
              <div className='text-red-400 text-sm'>{error}</div>
            )}
            
            <button
              type='submit'
              className='w-full py-2 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen'>
      <div className='p-4 border-b border-gray-700 flex justify-between items-center'>
        <h1 className='text-2xl font-extralight text-teal-400'>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
        >
          Logout
        </button>
      </div>
      
      <AdminDashboard />
    </div>
  );
}