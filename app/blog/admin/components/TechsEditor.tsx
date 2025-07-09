'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTechs, useTags, useCreateTech, useUpdateTech, useDeleteTech } from '@/hooks/useQueries';
import { Tech } from '@/lib/api';
// Import major icon categories from react-icons
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Bs from 'react-icons/bs';
import * as Ci from 'react-icons/ci';
import * as Di from 'react-icons/di';
import * as Fa from 'react-icons/fa';
import * as Fc from 'react-icons/fc';
import * as Fi from 'react-icons/fi';
import * as Gi from 'react-icons/gi';
import * as Go from 'react-icons/go';
import * as Gr from 'react-icons/gr';
import * as Hi from 'react-icons/hi';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io';
import * as Lu from 'react-icons/lu';
import * as Md from 'react-icons/md';
import * as Pi from 'react-icons/pi';
import * as Ri from 'react-icons/ri';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';
import * as Ti from 'react-icons/ti';
import * as Wi from 'react-icons/wi';

interface IconOption {
  name: string;
  component: React.ComponentType;
  category: string;
}

export default function TechsEditor() {
  // React Query hooks
  const { data: techs = [], isLoading: techsLoading, error: techsError } = useTechs();
  const { data: availableTags = [], isLoading: tagsLoading } = useTags();
  const createTechMutation = useCreateTech();
  const updateTechMutation = useUpdateTech();
  const deleteTechMutation = useDeleteTech();

  // Local state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTech, setNewTech] = useState({ 
    name: '', 
    icon: '', 
    experience: '', 
    comfortLevel: '',
    summary: ''
  });
  const [editingTech, setEditingTech] = useState<Tech | null>(null);
  const [message, setMessage] = useState('');
  
  // Icon search functionality
  const [iconSearch, setIconSearch] = useState('');
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);
  const [availableIcons, setAvailableIcons] = useState<IconOption[]>([]);

  // Icon libraries mapping
  const iconLibraries = {
    'Ant Design': Ai,
    'Boxicons': Bi,
    'Bootstrap': Bs,
    'CircumIcons': Ci,
    'Devicons': Di,
    'Font Awesome': Fa,
    'Flat Color': Fc,
    'Feather': Fi,
    'Game Icons': Gi,
    'Github Octicons': Go,
    'Grommet': Gr,
    'Heroicons': Hi,
    'IcoMoon Free': Im,
    'Ionicons': Io,
    'Lucide': Lu,
    'Material Design': Md,
    'Phosphor': Pi,
    'Remix Icon': Ri,
    'Simple Icons': Si,
    'Tabler Icons': Tb,
    'Themify': Ti,
    'Weather Icons': Wi,
  };

  useEffect(() => {
    loadAvailableIcons();
  }, []);

  const loadAvailableIcons = () => {
    const icons: IconOption[] = [];
    
    // Get all icon names from each library
    Object.entries(iconLibraries).forEach(([categoryName, iconLib]) => {
      Object.keys(iconLib).forEach(iconName => {
        const IconComponent = (iconLib as any)[iconName];
        if (IconComponent && typeof IconComponent === 'function') {
          icons.push({
            name: iconName,
            component: IconComponent,
            category: categoryName
          });
        }
      });
    });
    
    // Sort by category then name
    icons.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    });
    
    setAvailableIcons(icons);
  };

  const resetForm = () => {
    setNewTech({ name: '', icon: '', experience: '', comfortLevel: '', summary: '' });
    setSelectedTags([]);
    setEditingTech(null);
    setIconSearch('');
    setIsIconDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech.name || !newTech.icon) return;

    try {
      const techData: any = {
        name: newTech.name,
        icon: newTech.icon,
        tags: selectedTags
      };

      // Add stats if they have values
      if (newTech.experience || newTech.comfortLevel) {
        techData.stats = {};
        if (newTech.experience) {
          techData.stats.experience = newTech.experience;
        }
        if (newTech.comfortLevel) {
          techData.stats.comfortLevel = newTech.comfortLevel;
        }
      }

      // Add summary if it has a value
      if (newTech.summary && newTech.summary.trim()) {
        techData.summary = newTech.summary.trim();
      }

      if (editingTech) {
        await updateTechMutation.mutateAsync({ id: editingTech.id!, data: techData });
        setMessage('Technology updated successfully!');
      } else {
        await createTechMutation.mutateAsync(techData);
        setMessage('Technology added successfully!');
      }

      resetForm();
    } catch (error: any) {
      setMessage('Error saving technology: ' + error.message);
    }
  };

  const handleDelete = async (techId: string) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      try {
        await deleteTechMutation.mutateAsync(techId);
        setMessage('Technology deleted successfully!');
      } catch (error: any) {
        setMessage('Error deleting technology: ' + error.message);
      }
    }
  };

  const handleEdit = (tech: Tech) => {
    setEditingTech(tech);
    setNewTech({
      name: tech.name,
      icon: tech.icon,
      experience: tech.stats?.experience || '',
      comfortLevel: tech.stats?.comfortLevel || '',
      summary: tech.summary || ''
    });
    setSelectedTags(tech.tags || []);
    setIconSearch('');
    setIsIconDropdownOpen(false);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Filter icons based on search term
  const filteredIcons = availableIcons.filter(icon =>
    icon.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
    icon.category.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    setNewTech(prev => ({ ...prev, icon: iconName }));
    setIconSearch(iconName);
    setIsIconDropdownOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    // Find the icon in any of the libraries
    for (const [, iconLib] of Object.entries(iconLibraries)) {
      if ((iconLib as any)[iconName]) {
        return (iconLib as any)[iconName];
      }
    }
    return null;
  };

  const selectedIcon = getIconComponent(newTech.icon);

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        
        {/* Form Section */}
        <div>
          <h2 className='text-2xl font-extralight text-teal-400 mb-6'>
            {editingTech ? 'Edit Technology' : 'Add New Technology'}
          </h2>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-gray-100 mb-2 font-medium'>Technology Name</label>
              <input
                type='text'
                value={newTech.name}
                onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='Enter technology name...'
                required
              />
            </div>

            <div className='relative'>
              <label className='block text-gray-100 mb-2 font-medium'>
                Icon
                {selectedIcon && (
                  <span className='ml-2 inline-flex items-center'>
                    {React.createElement(selectedIcon as any, { className: 'w-5 h-5 text-teal-400' })}
                    <span className='ml-1 text-sm text-gray-400'>({newTech.icon})</span>
                  </span>
                )}
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={iconSearch}
                  onChange={(e) => {
                    setIconSearch(e.target.value);
                    setIsIconDropdownOpen(true);
                  }}
                  onFocus={() => setIsIconDropdownOpen(true)}
                  className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                  placeholder='Search for an icon (e.g., React, JavaScript, Python)...'
                />
                
                {isIconDropdownOpen && (
                  <div className='absolute z-10 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                    <div className='p-2 text-xs text-gray-400 border-b border-gray-700'>
                      {filteredIcons.length} icons found
                    </div>
                    {filteredIcons.slice(0, 100).map((icon) => {
                      const IconComponent = icon.component;
                      return (
                        <div
                          key={icon.name}
                          onClick={() => handleIconSelect(icon.name)}
                          className='flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer'
                        >
                          {React.createElement(IconComponent as any, { className: 'w-5 h-5 text-teal-400 mr-3' })}
                          <div>
                            <div className='text-gray-100 text-sm'>{icon.name}</div>
                            <div className='text-gray-400 text-xs'>{icon.category}</div>
                          </div>
                        </div>
                      );
                    })}
                    {filteredIcons.length > 100 && (
                      <div className='p-2 text-xs text-gray-400 text-center border-t border-gray-700'>
                        Showing first 100 results. Refine your search for more specific results.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className='block text-gray-100 mb-2 font-medium'>Tags</label>
              <div className='bg-transparent border border-gray-600 rounded-lg p-3 max-h-40 overflow-y-auto'>
                <div className='grid grid-cols-2 gap-2'>
                  {availableTags.map(tag => (
                    <label key={tag.id} className='flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={selectedTags.includes(tag.id!)}
                        onChange={() => toggleTag(tag.id!)}
                        className='mr-2 text-teal-400 focus:ring-teal-400'
                      />
                      <span className='text-gray-100 text-sm'>{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className='mt-2'>
                <div className='flex flex-wrap gap-1'>
                  {selectedTags.map(tagId => {
                    const tag = availableTags.find(t => t.id === tagId);
                    return tag ? (
                      <span key={tagId} className='px-2 py-1 bg-pink-300 text-black text-xs rounded-full'>
                        {tag.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className='block text-gray-100 mb-2 font-medium'>Experience Level</label>
              <select
                value={newTech.experience}
                onChange={(e) => setNewTech({ ...newTech, experience: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400'
              >
                <option value='' className='bg-gray-800'>Select experience level...</option>
                <option value='Beginner' className='bg-gray-800'>Beginner</option>
                <option value='Intermediate' className='bg-gray-800'>Intermediate</option>
                <option value='Advanced' className='bg-gray-800'>Advanced</option>
                <option value='Expert' className='bg-gray-800'>Expert</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-100 mb-2 font-medium'>Comfort Level</label>
              <select
                value={newTech.comfortLevel}
                onChange={(e) => setNewTech({ ...newTech, comfortLevel: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400'
              >
                <option value='' className='bg-gray-800'>Select comfort level...</option>
                <option value='Learning' className='bg-gray-800'>Learning</option>
                <option value='Comfortable' className='bg-gray-800'>Comfortable</option>
                <option value='Confident' className='bg-gray-800'>Confident</option>
                <option value='Highly Proficient' className='bg-gray-800'>Highly Proficient</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-100 mb-2 font-medium'>Summary</label>
              <textarea
                value={newTech.summary}
                onChange={(e) => setNewTech({ ...newTech, summary: e.target.value })}
                rows={4}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-vertical'
                placeholder='Enter a detailed summary or description of this technology...'
              />
            </div>

            <div className='flex gap-3'>
              <button
                type='submit'
                disabled={createTechMutation.isPending || updateTechMutation.isPending}
                className='flex-1 py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50'
              >
                {(createTechMutation.isPending || updateTechMutation.isPending) ? 'Saving...' : (editingTech ? 'Update Technology' : 'Add Technology')}
              </button>
              
              {editingTech && (
                <button
                  type='button'
                  onClick={resetForm}
                  className='px-6 py-3 bg-transparent border border-gray-600 text-gray-100 font-medium rounded-lg hover:border-gray-500 transition-colors'
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-900 border border-red-600 text-red-300' 
                : 'bg-green-900 border border-green-600 text-green-300'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Technologies List Section */}
        <div>
          <h3 className='text-xl font-extralight text-teal-400 mb-6'>Current Technologies</h3>
          
          <div className='space-y-4 overflow-y-auto'>
            {techs.map(tech => {
              const IconComponent = getIconComponent(tech.icon);
              return (
                <div key={tech.id} className='bg-transparent border border-gray-600 rounded-lg p-4'>
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex items-center'>
                      {IconComponent && React.createElement(IconComponent as any, { className: 'w-6 h-6 text-teal-400 mr-3' })}
                      <div>
                        <h4 className='text-gray-100 font-medium text-lg'>{tech.name}</h4>
                        <p className='text-gray-400 text-sm'>Icon: {tech.icon}</p>
                        {tech.description && (
                          <p className='text-gray-300 text-sm mt-1 italic'>{tech.description}</p>
                        )}
                        {tech.stats && (
                          <div className='text-sm text-gray-400 mt-1'>
                            {tech.stats.experience && (
                              <span className='mr-4'>Experience: {tech.stats.experience}</span>
                            )}
                            {tech.stats.comfortLevel && (
                              <span>Comfort: {tech.stats.comfortLevel}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleEdit(tech)}
                        className='px-3 py-1 bg-teal-400 text-black text-sm rounded hover:bg-teal-300 transition-colors'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tech.id!)}
                        className='px-3 py-1 bg-pink-300 text-black text-sm rounded hover:bg-pink-400 transition-colors'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {tech.tags && tech.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {tech.tags.map((tagId, index) => {
                        const tag = availableTags.find(t => t.id === tagId);
                        return tag ? (
                          <Link 
                            key={index}
                            href={`/tags/${encodeURIComponent(tag.name)}`}
                            className='px-2 py-1 bg-pink-300 text-black text-xs rounded-full hover:bg-pink-400 transition-colors'
                          >
                            {tag.name}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {techs.length === 0 && (
            <div className='text-center text-gray-400 py-8'>
              No technologies found. Add your first technology!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
