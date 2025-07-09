'use client';
import { useState } from 'react';
import { useBlogPosts, useTags, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from '@/hooks/useQueries';
import { BlogPost } from '@/lib/api';

export default function BlogEditor() {
  // React Query hooks
  const { data: posts = [], isLoading: postsLoading, error: postsError } = useBlogPosts();
  const { data: availableTags = [], isLoading: tagsLoading } = useTags();
  const createBlogPostMutation = useCreateBlogPost();
  const updateBlogPostMutation = useUpdateBlogPost();
  const deleteBlogPostMutation = useDeleteBlogPost();

  // Local state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedTags([]);
    setEditingPost(null);
    setIsEditing(false);
  };

  const startEdit = (post: BlogPost) => {
    setTitle(post.title);
    setContent(post.content);
    setSelectedTags(post.tags || []);
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isEditing && editingPost) {
        // Update existing post
        await updateBlogPostMutation.mutateAsync({
          id: editingPost.id!,
          data: {
            title,
            content,
            tags: selectedTags,
            updatedAt: new Date(),
          }
        });
        setMessage('Blog post updated successfully!');
      } else {
        // Create new post
        await createBlogPostMutation.mutateAsync({
          title,
          content,
          tags: selectedTags,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        setMessage('Blog post created successfully!');
      }

      resetForm();
    } catch (error: any) {
      setMessage('Error saving blog post: ' + error.message);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await deleteBlogPostMutation.mutateAsync(postId);
      setMessage('Blog post deleted successfully!');
    } catch (error: any) {
      setMessage('Error deleting blog post: ' + error.message);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (postsLoading) return <div className="text-gray-100">Loading posts...</div>;
  if (postsError) return <div className="text-red-400">Error loading posts</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div>
          <h2 className="text-2xl font-extralight text-teal-400 mb-6">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-100 mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter post title..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-100 mb-2 font-medium">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-vertical"
                placeholder="Enter post content (Markdown supported)..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-100 mb-2 font-medium">Tags</label>
              <div className="bg-transparent border border-gray-600 rounded-lg p-3 max-h-40 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {availableTags.map(tag => (
                    <label key={tag.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id!)}
                        onChange={() => toggleTag(tag.id!)}
                        className="mr-2 text-teal-400 focus:ring-teal-400"
                      />
                      <span className="text-gray-100 text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map(tagId => {
                    const tag = availableTags.find(t => t.id === tagId);
                    return tag ? (
                      <span key={tagId} className="px-2 py-1 bg-pink-300 text-black text-xs rounded-full">
                        {tag.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={createBlogPostMutation.isPending || updateBlogPostMutation.isPending}
                className="flex-1 py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50"
              >
                {(createBlogPostMutation.isPending || updateBlogPostMutation.isPending) ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-transparent border border-gray-600 text-gray-100 font-medium rounded-lg hover:border-gray-500 transition-colors"
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

        {/* Posts List Section */}
        <div>
          <h3 className="text-xl font-extralight text-teal-400 mb-6">Blog Posts</h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {posts.map(post => (
              <div key={post.id} className="bg-transparent border border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-gray-100 font-medium text-lg">{post.title}</h4>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{post.content}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Created: {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => startEdit(post)}
                      className="px-3 py-1 bg-teal-400 text-black text-sm rounded hover:bg-teal-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id!)}
                      className="px-3 py-1 bg-pink-300 text-black text-sm rounded hover:bg-pink-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tagId, index) => {
                      const tag = availableTags.find(t => t.id === tagId);
                      return tag ? (
                        <span key={index} className="px-2 py-1 bg-pink-300 text-black text-xs rounded-full">
                          {tag.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No blog posts found. Create your first post!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
