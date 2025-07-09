import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BlogPost from '@/app/blog/components/BlogPost';
import ProjectCard from '@/app/projects/components/ProjectCard';
import Tag from '@/components/Tag';

interface TagPageProps {
  params: {
    tag: string;
  };
}

const loadContentByTag = async (tag: string) => {
  const decodedTag = decodeURIComponent(tag);
  
  // First, try to find the tag in the tags collection to get both ID and name
  const tagsQuery = query(collection(db, 'tags'));
  const tagsDocs = await getDocs(tagsQuery);
  const allTags = tagsDocs.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
  
  // Find the tag by either ID or name
  const tagDoc = allTags.find(t => t.id === decodedTag || t.name === decodedTag);
  const tagId = tagDoc?.id || decodedTag;
  const tagName = tagDoc?.name || decodedTag;
  
  // Load blog posts with this tag ID
  const blogQuery = query(
    collection(db, 'blog'),
    where('tags', 'array-contains', tagId),
    orderBy('createdAt', 'desc')
  );
  const blogDocs = await getDocs(blogQuery);
  const blogPosts = blogDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Load projects with this tag ID
  const projectQuery = query(
    collection(db, 'projects'),
    where('tags', 'array-contains', tagId)
  );
  const projectDocs = await getDocs(projectQuery);
  const projects = projectDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return { blogPosts, projects, tagName, tagId };
};

export default async function TagPage({ params }: TagPageProps) {
  const { blogPosts, projects, tagName, tagId } = await loadContentByTag(params.tag);

  return (
    <div className='bg-black text-gray-100 p-8 h-full overflow-clip'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-extralight text-teal-400 mb-4'>
            Content tagged with:
          </h1>
          <Tag 
            id={tagId}
            name={tagName}
            size="xl"
            variant="solid"
            clickable={false}
            className="text-2xl"
          />
        </div>
        
        <div className='flex p-2'>
          {/* Projects Section */}
          {projects.length > 0 && (
            <section className='mb-12 w-1/2 mx-4 h-screen pb-96 overflow-scroll p-2'>
              <h2 className='text-3xl font-extralight text-pink-300 mb-6'>Projects</h2>
              <div className='flex'>
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
            <section className='mb-12 w-1/2 h-screen pb-96 overflow-scroll mx-4 p-2'>
              <h2 className='text-3xl font-extralight text-pink-300 mb-6'>Blog Posts</h2>
              <div className='flex'>
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
    </div>
  );
}
