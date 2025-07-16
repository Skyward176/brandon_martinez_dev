'use client';
import { useState } from 'react';
import { HiPencil, HiRocketLaunch, HiBolt, HiTag, HiHome, HiDocumentText } from 'react-icons/hi2';
import BlogEditor from './BlogEditor';
import ProjectsEditor from './ProjectsEditor'; // Projects management
import TechsEditor from './TechsEditor';
import HomepageEditor from './HomepageEditor';
import TagEditor from './TagEditor';
import ResumeEditor from './ResumeEditor';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blog');

  const tabs = [
    { id: 'blog', label: 'Blog Posts', icon: HiPencil },
    { id: 'projects', label: 'Projects', icon: HiRocketLaunch },
    { id: 'techs', label: 'Technologies', icon: HiBolt },
    { id: 'tags', label: 'Tags', icon: HiTag },
    { id: 'homepage', label: 'Homepage Content', icon: HiHome },
    { id: 'resume', label: 'Resume', icon: HiDocumentText },
  ];

  return (
    <div className='p-6'>
      {/* Tab Navigation */}
      <div className='flex space-x-1 mb-6 bg-black p-1 rounded-lg'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-teal-400 text-black'
                : 'text-gray-400 hover:text-white hover:outline hover:outline-1 hover:outline-gray-600'
            }`}
          >
            <tab.icon className='mr-2 inline-block w-4 h-4' />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='bg-black rounded-lg p-6 overflow-scroll'>
        {activeTab === 'blog' && <BlogEditor />}
        {activeTab === 'projects' && <ProjectsEditor />}
        {activeTab === 'techs' && <TechsEditor />}
        {activeTab === 'tags' && <TagEditor />}
        {activeTab === 'homepage' && <HomepageEditor />}
        {activeTab === 'resume' && <ResumeEditor />}
      </div>
    </div>
  );
}
