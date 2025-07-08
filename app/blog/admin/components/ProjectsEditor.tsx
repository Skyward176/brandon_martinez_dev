'use client';
import React, { useState } from 'react';
import { useProjects, useTags, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks/useQueries';
import { Project } from '@/lib/api';
import Link from 'next/link';
import CldImage from "@/components/CldImage";
import { HiCheck } from 'react-icons/hi2';

export default function ProjectsEditor() {
  // React Query hooks
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjects();
  const { data: availableTags = [], isLoading: tagsLoading } = useTags();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  // Local state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    url: '',
    img: '',
    videoUrl: '',
    article: ''
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [message, setMessage] = useState('');
  const resetForm = () => {
    setNewProject({
      name: '',
      description: '',
      url: '',
      img: '',
      videoUrl: '',
      article: ''
    });
    setSelectedTags([]);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description || !newProject.url) return;

    setMessage('');

    try {
      const projectData: any = {
        name: newProject.name,
        description: newProject.description,
        url: newProject.url,
        tags: selectedTags
      };

      // Only add optional fields if they have values
      if (newProject.img && newProject.img.trim()) {
        projectData.img = newProject.img.trim();
      }
      if (newProject.videoUrl && newProject.videoUrl.trim()) {
        projectData.videoUrl = newProject.videoUrl.trim();
      }
      if (newProject.article && newProject.article.trim()) {
        projectData.article = newProject.article.trim();
      }

      if (editingProject) {
        await updateProjectMutation.mutateAsync({ id: editingProject.id!, data: projectData });
        setMessage('Project updated successfully!');
      } else {
        await createProjectMutation.mutateAsync(projectData);
        setMessage('Project added successfully!');
      }

      resetForm();
    } catch (error: any) {
      setMessage('Error saving project: ' + error.message);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      url: project.url,
      img: project.img || '',
      videoUrl: project.videoUrl || '',
      article: project.article || ''
    });
    setSelectedTags(project.tags || []);
  };

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProjectMutation.mutateAsync(projectId);
        setMessage('Project deleted successfully!');
      } catch (error: any) {
        setMessage('Error deleting project: ' + error.message);
      }
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderPreview = () => {
    if (!newProject.name && !newProject.description && !newProject.img && !newProject.videoUrl) {
      return null;
    }

    return (
      <div className='mt-6 p-4 bg-transparent border border-gray-600 rounded-lg'>
        <h4 className='text-white font-medium mb-3'>Preview</h4>
        <div className='bg-transparent border border-gray-500 rounded-lg p-4'>
          {newProject.videoUrl && (
            <div className='w-full aspect-video mb-4'>
              {(() => {
                const videoId = getYouTubeVideoId(newProject.videoUrl);
                return videoId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${newProject.name} video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='rounded-lg border border-pink-300'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-gray-700 rounded-lg border border-pink-300'>
                    <span className='text-gray-400'>Invalid YouTube URL</span>
                  </div>
                );
              })()}
            </div>
          )}
          
          {newProject.img && !newProject.videoUrl && (
            <CldImage
              src={newProject.img}
              width={400}
              height={400}
              className='w-full object-contain border border-pink-300 rounded-lg mb-4'
              alt={newProject.name}
            />
          )}
          
          <h3 className='text-white font-bold text-xl mb-2'>{newProject.name}</h3>
          <p className='text-gray-300 mb-3'>{newProject.description}</p>
          
          {selectedTags.length > 0 && (
            <div className='flex flex-wrap gap-1 mb-3'>
              {selectedTags.map(tagId => {
                const tag = availableTags.find(t => t.id === tagId);
                return tag ? (
                  <span key={tagId} className='px-2 py-1 bg-pink-300 text-black text-xs rounded-full'>
                    {tag.name}
                  </span>
                ) : null;
              })}
            </div>
          )}
          
          <a
            href={newProject.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block px-4 py-2 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors'
          >
            View Project
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-screen'>
        
        {/* Form Section */}
        <div className='overflow-y-auto max-h-screen pr-2'>
          <h2 className='text-2xl font-extralight text-teal-400 mb-6'>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-white mb-2 font-medium'>Project Name</label>
              <input
                type='text'
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='Enter project name...'
                required
              />
            </div>

            <div>
              <label className='block text-white mb-2 font-medium'>Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='Enter project description...'
                rows={3}
                required
              />
            </div>

            <div>
              <label className='block text-white mb-2 font-medium'>Project URL</label>
              <input
                type='url'
                value={newProject.url}
                onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='https://github.com/username/project'
                required
              />
            </div>

            <div>
              <label className='block text-white mb-2 font-medium'>Image URL (optional)</label>
              <input
                type='text'
                value={newProject.img}
                onChange={(e) => setNewProject({ ...newProject, img: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='Enter image URL or Cloudinary path...'
              />
            </div>

            <div>
              <label className='block text-white mb-2 font-medium'>Video URL (optional)</label>
              <input
                type='url'
                value={newProject.videoUrl}
                onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='https://www.youtube.com/watch?v=...'
              />
            </div>

            <div>
              <label className='block text-white mb-2 font-medium'>Detailed Article (optional)</label>
              <textarea
                value={newProject.article}
                onChange={(e) => setNewProject({ ...newProject, article: e.target.value })}
                className='w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
                placeholder='Enter detailed article content (supports Markdown)...'
                rows={6}
              />
            </div>

            <div>
              <label className='block text-white mb-2 font-medium'>Tags</label>
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
                      <span className='text-white text-sm'>{tag.name}</span>
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

            <div className='flex gap-3'>
              <button
                type='submit'
                disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                className='flex-1 py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50'
              >
                {(createProjectMutation.isPending || updateProjectMutation.isPending) ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
              </button>
              
              {editingProject && (
                <button
                  type='button'
                  onClick={resetForm}
                  className='px-6 py-3 bg-transparent border border-gray-600 text-white font-medium rounded-lg hover:border-gray-500 transition-colors'
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

          {renderPreview()}
        </div>

        {/* Projects List Section */}
        <div className='overflow-y-auto max-h-screen pr-2'>
          <h3 className='text-xl font-extralight text-teal-400 mb-6'>Current Projects</h3>
          
          <div className='space-y-4'>
            {projects.map(project => (
              <div key={project.id} className='bg-transparent border border-gray-600 rounded-lg p-4'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h4 className='text-white font-medium text-lg'>{project.name}</h4>
                    <p className='text-gray-400 text-sm mb-2'>{project.description}</p>
                    <div className='flex flex-wrap gap-2 text-xs text-gray-500'>
                      <span>URL: {project.url}</span>
                      {project.img && <span>• Image: ✓</span>}
                      {project.videoUrl && <span>• Video: ✓</span>}
                      {project.article && <span>• Article: ✓</span>}
                    </div>
                  </div>
                  <div className='flex gap-2 ml-4'>
                    <button
                      onClick={() => handleEdit(project)}
                      className='px-3 py-1 bg-teal-400 text-black text-sm rounded hover:bg-teal-300 transition-colors'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id!)}
                      className='px-3 py-1 bg-pink-300 text-black text-sm rounded hover:bg-pink-400 transition-colors'
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {project.tags && project.tags.length > 0 && (
                  <div className='flex flex-wrap gap-1 mt-2'>
                    {project.tags.map((tagId, index) => {
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
            ))}
          </div>

          {projects.length === 0 && (
            <div className='text-center text-gray-400 py-8'>
              No projects found. Add your first project!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
