import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BlogPost from '@/app/blog/components/BlogPost';
import ProjectCard from '@/app/projects/components/ProjectCard';

interface TagPageProps {
  params: {
    tag: string;
  };
}

const loadContentByTag = async (tag: string) => {
  const decodedTag = decodeURIComponent(tag);
  
  // Load blog posts with this tag
  const blogQuery = query(
    collection(db, 'blog'),
    where('tags', 'array-contains', decodedTag),
    orderBy('createdAt', 'desc')
  );
  const blogDocs = await getDocs(blogQuery);
  const blogPosts = blogDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Load projects with this tag
  const projectQuery = query(
    collection(db, 'projects'),
    where('tags', 'array-contains', decodedTag)
  );
  const projectDocs = await getDocs(projectQuery);
  const projects = projectDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { blogPosts, projects };
};

export default async function TagPage({ params }: TagPageProps) {
  const { blogPosts, projects } = await loadContentByTag(params.tag);
  const decodedTag = decodeURIComponent(params.tag);

  return (
    <div className='bg-black min-h-screen text-white p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-extralight text-teal-400 mb-4'>
            Content tagged with
          </h1>
          <span className='inline-block px-6 py-3 bg-pink-300 text-black text-2xl rounded-full'>
            {decodedTag}
          </span>
        </div>

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className='mb-12'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-6'>Projects</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {projects.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  url={project.url}
                  img={project.img}
                  videoUrl={project.videoUrl}
                />
              ))}
            </div>
          </section>
        )}

        {/* Blog Posts Section */}
        {blogPosts.length > 0 && (
          <section className='mb-12'>
            <h2 className='text-3xl font-extralight text-teal-400 mb-6'>Blog Posts</h2>
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

        {/* No Content Message */}
        {blogPosts.length === 0 && projects.length === 0 && (
          <div className='text-center text-gray-400 mt-16'>
            <p className='text-xl'>No content found for this tag yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
