import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BlogPostSmall from '@/app/blog/components/BlogPostSmall';
import ProjectCardSmall from '@/app/projects/components/ProjectCardSmall';
import { notFound } from 'next/navigation';
import React from 'react';
import TechIcon from './components/TechIcon';

interface TechPageProps {
  params: {
    tech: string;
  };
}

interface Tech {
  id: string;
  name: string;
  icon: string;
  tags: string[];
  stats?: {
    experience?: string;
    comfortLevel?: string;
  };
  description?: string;
  summary?: string;
}

const loadTechData = async (techName: string) => {
  const decodedTechName = decodeURIComponent(techName);
  
  // Load the specific tech document
  const techQuery = query(
    collection(db, 'techs'),
    where('name', '==', decodedTechName)
  );
  const techDocs = await getDocs(techQuery);
  
  if (techDocs.empty) {
    return null;
  }
  
  const tech = { id: techDocs.docs[0].id, ...techDocs.docs[0].data() } as Tech;
  
  // Get all tag IDs that this tech is associated with
  const tagIds = tech.tags || [];
  
  // Also find the tag ID that matches this tech name (for direct relationships)
  const tagsQuery = query(
    collection(db, 'tags'),
    where('name', '==', decodedTechName)
  );
  const tagDocs = await getDocs(tagsQuery);
  
  if (!tagDocs.empty) {
    const techNameTagId = tagDocs.docs[0].id;
    // Add the tech name tag ID if it's not already in the list
    if (!tagIds.includes(techNameTagId)) {
      tagIds.push(techNameTagId);
    }
  }
  
  if (tagIds.length === 0) {
    // If no tags found, return with empty related content
    return { tech, blogPosts: [], projects: [] };
  }
  
  // Load related blog posts (posts that have any of these tag IDs)
  let blogPosts: any[] = [];
  if (tagIds.length > 0) {
    // Firestore array-contains-any supports up to 10 values
    const blogQuery = query(
      collection(db, 'blog'),
      where('tags', 'array-contains-any', tagIds.slice(0, 10))
    );
    const blogDocs = await getDocs(blogQuery);
    blogPosts = blogDocs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to plain object
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
      };
    });
    
    // Sort by creation date on the client side
    blogPosts.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime; // Newest first
    });
  }

  // Load related projects (projects that have any of these tag IDs)
  let projects: any[] = [];
  if (tagIds.length > 0) {
    // Firestore array-contains-any supports up to 10 values
    const projectQuery = query(
      collection(db, 'projects'),
      where('tags', 'array-contains-any', tagIds.slice(0, 10))
    );
    const projectDocs = await getDocs(projectQuery);
    projects = projectDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  return { tech, blogPosts, projects };
};

export default async function TechPage({ params }: TechPageProps) {
  const techData = await loadTechData(params.tech);
  
  if (!techData) {
    notFound();
  }
  
  const { tech, blogPosts, projects } = techData;
  const decodedTechName = decodeURIComponent(params.tech);

  return (
    <div className='bg-black text-gray-100 p-8 h-full'>
      <div className='max-w-6xl mx-auto h-full'>
        {/* Tech Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-6'>
            <TechIcon 
              iconName={tech.icon} 
              techName={tech.name} 
              className='w-24 h-24 mr-6'
            />
            <h1 className='text-6xl font-extralight text-teal-400'>
              {tech.name}
            </h1>
          </div>
          
          {/* Description */}
          {tech.description && (
            <p className='text-xl text-gray-300 mb-8 max-w-3xl mx-auto'>
              {tech.description}
            </p>
          )}
          
          {/* Stats */}
          {tech.stats && (
            <div className='flex justify-center gap-8 mb-8'>
              {tech.stats.experience && (
                <div className='bg-gray-900 rounded-lg p-4 border border-gray-700'>
                  <h3 className='text-teal-400 font-medium mb-2'>Experience Level</h3>
                  <p className='text-gray-100 text-lg'>{tech.stats.experience}</p>
                </div>
              )}
              {tech.stats.comfortLevel && (
                <div className='bg-gray-900 rounded-lg p-4 border border-gray-700'>
                  <h3 className='text-teal-400 font-medium mb-2'>Comfort Level</h3>
                  <p className='text-gray-100 text-lg'>{tech.stats.comfortLevel}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Summary */}
          {tech.summary && (
            <div className='bg-gray-900 rounded-lg p-6 border border-gray-700 mb-12 max-w-4xl mx-auto'>
              <h2 className='text-2xl font-extralight text-teal-400 mb-4'>About {tech.name}</h2>
              <p className='text-gray-100 leading-relaxed text-lg'>{tech.summary}</p>
            </div>
          )}
        </div>
        {/* Related Projects Section */}
        {projects.length > 0 && (
          <section className='mb-12'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-2'>
              Related Projects
            </h2>
            <p className='text-gray-400 mb-6'>
              Projects that use {tech.name} or share similar technologies
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {projects.map((project: any) => (
                <ProjectCardSmall
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  url={project.url}
                  img={project.img}
                  videoUrl={project.videoUrl}
                  tags={project.tags}
                  id={project.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Related Blog Posts Section */}
        {blogPosts.length > 0 && (
          <section className='mb-12'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-2'>
              Related Blog Posts
            </h2>
            <p className='text-gray-400 mb-6'>
              Posts about {tech.name} and related topics
            </p>
            <div className='grid grid-cols-1 gap-4'>
              {blogPosts.map((post: any) => (
                <BlogPostSmall
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                  tags={post.tags}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Related Content Message */}
        {blogPosts.length === 0 && projects.length === 0 && (
          <div className='text-center text-gray-400 mt-16'>
            <p className='text-xl'>No related projects or blog posts found for {tech.name} yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
