'use client';
import { useState } from 'react';
import BlogEditor from './BlogEditor';
import TechsEditor from './TechsEditor';
import HomepageEditor from './HomepageEditor';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blog');

  const tabs = [
    { id: 'blog', label: 'Blog Posts', icon: '📝' },
    { id: 'techs', label: 'Technologies', icon: '⚡' },
    { id: 'homepage', label: 'Homepage Content', icon: '🏠' },
  ];

  return (
    <div className='p-6'>
      {/* Tab Navigation */}
      <div className='flex space-x-1 mb-6 bg-gray-900 p-1 rounded-lg'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-teal-400 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className='mr-2'>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='bg-gray-900 rounded-lg p-6'>
        {activeTab === 'blog' && <BlogEditor />}
        {activeTab === 'techs' && <TechsEditor />}
        {activeTab === 'homepage' && <HomepageEditor />}
      </div>
    </div>
  );
}
