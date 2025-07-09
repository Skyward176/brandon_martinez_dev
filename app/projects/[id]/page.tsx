import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CldImage from '@/components/CldImage';
import BlogPost from '@/app/blog/components/BlogPost';
import { FaGithub } from 'react-icons/fa';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

const loadProjectDetails = async (projectId: string) => {
  // Load project details
  const projectDoc = await getDoc(doc(db, 'projects', projectId));
  if (!projectDoc.exists()) {
    return null;
  }
  
  const project: any = { id: projectDoc.id, ...projectDoc.data() };
  
  // Load all tags for name resolution
  let tags: any[] = [];
  const tagsQuery = await getDocs(collection(db, 'tags'));
  tags = tagsQuery.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
  
  // Load related blog posts if project has tags
  let relatedPosts: any[] = [];
  if (project.tags && project.tags.length > 0) {
    const blogQuery = query(
      collection(db, 'blog'),
      where('tags', 'array-contains-any', project.tags)
    );
    const blogDocs = await getDocs(blogQuery);
    relatedPosts = blogDocs.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to plain object
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
      };
    });
  }
  
  return { project, relatedPosts, tags };
};

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const result = await loadProjectDetails(params.id);
  
  if (!result) {
    notFound();
  }
  
  const { project, relatedPosts, tags } = result;

  const renderMedia = () => {
    if (project.videoUrl) {
      const videoId = getYouTubeVideoId(project.videoUrl);
      if (videoId) {
        return (
          <div className='w-full max-w-4xl mx-auto aspect-video mb-8'>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${project.name} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className='rounded-lg border border-pink-300'
            />
          </div>
        );
      }
    }
    
    if (project.img) {
      return (
        <div className='w-full max-w-4xl mx-auto mb-8'>
          <CldImage
            src={project.img}
            width={800}
            height={600}
            className='w-full object-contain border border-pink-300 rounded-lg'
            alt={`${project.name} image`}
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className='bg-black text-white h-full overflow-auto'>
      <div className='max-w-6xl mx-auto p-8'>
        {/* Back Button */}
        <Link 
          href="/projects" 
          className='inline-flex items-center text-gray-300 hover:text-teal-300 mb-8 transition-colors'
        >
          ← Back to Projects
        </Link>

        {/* Project Header */}
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-extralight text-teal-400 mb-4'>{project.name}</h1>
          <p className='text-xl text-gray-300 mb-6'>{project.description}</p>
          
          {/* External Link */}
            {project.url && (
            <div className="flex justify-center">
              <div
              className='px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-teal-300 hover:text-black hover:scale-105 transition-colors flex w-96 justify-center'
              >
              <FaGithub className="inline-block mr-2 text-3xl" />
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                View Project on GitHub
              </a>
              </div>
            </div>
            )}
        </div>

        {/* Media */}
        {renderMedia()}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className='flex flex-wrap gap-3 justify-center mb-8'>
            {project.tags.map((tagId: string, index: number) => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <Link 
                  key={index}
                  href={`/tags/${encodeURIComponent(tag.name)}`}
                  className='px-4 py-2 border-1 border-pink-300 text-lg text-white rounded-full transition-all duration-300 hover:text-black hover:font-medium hover:bg-pink-400 hover:scale-105 ml-3 duration:300'
                >
                  {tag.name}
                </Link>
              ) : null;
            })}
          </div>
        )}

        {/* Detailed Article */}
        {project.article && (
          <div className='max-w-4xl mx-auto mb-12'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-6'>About This Project</h2>
            <div className='bg-gray-900 rounded-lg p-8 border border-gray-700'>
              <div className='text-white leading-relaxed whitespace-pre-wrap'>
                {project.article}
              </div>
            </div>
          </div>
        )}

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-6'>Related Blog Posts</h2>
            <div className='space-y-6'>
              {relatedPosts.map((post: any) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
