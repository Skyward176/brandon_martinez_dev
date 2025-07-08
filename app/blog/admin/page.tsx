'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import AdminDashboard from './components/AdminDashboard';

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className='bg-black h-full flex items-center justify-center'>
        <div className='text-white text-xl'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className='bg-black h-full'>
      <AdminDashboard />
    </div>
  );
}