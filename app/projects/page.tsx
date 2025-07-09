'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from './components/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener for projects collection
    const unsubscribe = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setProjects(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='flex flex-col md:flex-row text-gray-100 p-8'>
        <div>Loading projects...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row text-gray-100 p-8 max-w-screen-2xl mx-auto h-full gap-4'>
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          url={project.url}
          img={project.img}
          videoUrl={project.videoUrl}
          tags={project.tags}
        />
      ))}
    </div>
  )
}

export default Projects;
