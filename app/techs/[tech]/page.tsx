import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BlogPost from '@/app/blog/components/BlogPost';
import ProjectCard from '@/app/projects/components/ProjectCard';
import { notFound } from 'next/navigation';
import React from 'react';

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
  
  // Load related blog posts (posts that have a tag matching this tech name)
  const blogQuery = query(
    collection(db, 'blog'),
    where('tags', 'array-contains', decodedTechName)
  );
  const blogDocs = await getDocs(blogQuery);
  const blogPosts = blogDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Load related projects (projects that have a tag matching this tech name)
  const projectQuery = query(
    collection(db, 'projects'),
    where('tags', 'array-contains', decodedTechName)
  );
  const projectDocs = await getDocs(projectQuery);
  const projects = projectDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { tech, blogPosts, projects };
};

// Function to get icon component from icon name
const getIconComponent = (iconName: string) => {
  // Import icon libraries dynamically
  const iconLibraries = {
    'Ai': () => import('react-icons/ai'),
    'Bi': () => import('react-icons/bi'),
    'Bs': () => import('react-icons/bs'),
    'Ci': () => import('react-icons/ci'),
    'Di': () => import('react-icons/di'),
    'Fa': () => import('react-icons/fa'),
    'Fc': () => import('react-icons/fc'),
    'Fi': () => import('react-icons/fi'),
    'Gi': () => import('react-icons/gi'),
    'Go': () => import('react-icons/go'),
    'Gr': () => import('react-icons/gr'),
    'Hi': () => import('react-icons/hi'),
    'Im': () => import('react-icons/im'),
    'Io': () => import('react-icons/io'),
    'Lu': () => import('react-icons/lu'),
    'Md': () => import('react-icons/md'),
    'Pi': () => import('react-icons/pi'),
    'Ri': () => import('react-icons/ri'),
    'Si': () => import('react-icons/si'),
    'Tb': () => import('react-icons/tb'),
    'Ti': () => import('react-icons/ti'),
    'Wi': () => import('react-icons/wi'),
  };

  // Try to find the icon in the libraries
  for (const [prefix, importFn] of Object.entries(iconLibraries)) {
    if (iconName.startsWith(prefix)) {
      // For server-side rendering, we'll just return a placeholder
      // The actual icon will be rendered on the client side
      return null;
    }
  }
  return null;
};

export default async function TechPage({ params }: TechPageProps) {
  const techData = await loadTechData(params.tech);
  
  if (!techData) {
    notFound();
  }
  
  const { tech, blogPosts, projects } = techData;
  const decodedTechName = decodeURIComponent(params.tech);

  return (
    <div className='bg-black min-h-screen text-white p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Tech Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-6'>
            {/* Icon placeholder - will be enhanced with client component if needed */}
            <div className='w-20 h-20 bg-teal-400 rounded-lg flex items-center justify-center mr-6'>
              <span className='text-2xl font-bold text-black'>{tech.name.charAt(0)}</span>
            </div>
            <h1 className='text-6xl font-extralight text-teal-400'>
              {tech.name}
            </h1>
          </div>
          
          {/* Stats */}
          {tech.stats && (
            <div className='flex justify-center gap-8 mb-8'>
              {tech.stats.experience && (
                <div className='bg-gray-900 rounded-lg p-4 border border-gray-700'>
                  <h3 className='text-teal-400 font-medium mb-2'>Experience Level</h3>
                  <p className='text-white text-lg'>{tech.stats.experience}</p>
                </div>
              )}
              {tech.stats.comfortLevel && (
                <div className='bg-gray-900 rounded-lg p-4 border border-gray-700'>
                  <h3 className='text-teal-400 font-medium mb-2'>Comfort Level</h3>
                  <p className='text-white text-lg'>{tech.stats.comfortLevel}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Summary */}
          {tech.summary && (
            <div className='bg-gray-900 rounded-lg p-6 border border-gray-700 mb-12 max-w-4xl mx-auto'>
              <h2 className='text-2xl font-extralight text-teal-400 mb-4'>About {tech.name}</h2>
              <p className='text-white leading-relaxed text-lg'>{tech.summary}</p>
            </div>
          )}
        </div>

        {/* Related Projects Section */}
        {projects.length > 0 && (
          <section className='mb-12'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-6'>
              Projects using {tech.name}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {projects.map((project: any) => (
                <ProjectCard
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
            <h2 className='text-3xl font-extralight text-teal-400 mb-6'>
              Blog posts about {tech.name}
            </h2>
            <div className='space-y-8'>
              {blogPosts.map((post: any) => (
                <BlogPost
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
