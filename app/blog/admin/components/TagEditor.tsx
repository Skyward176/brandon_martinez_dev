'use client';
import { useState } from 'react';
import { useTags, useCreateTag, useUpdateTag, useDeleteTag } from '@/hooks/useQueries';
import { Tag } from '@/lib/api';

export default function TagEditor() {
  // React Query hooks
  const { data: tags = [], isLoading: tagsLoading, error: tagsError } = useTags();
  const createTagMutation = useCreateTag();
  const updateTagMutation = useUpdateTag();
  const deleteTagMutation = useDeleteTag();

  // Local state
  const [message, setMessage] = useState('');
  const [newTag, setNewTag] = useState('');
  const [addingTag, setAddingTag] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editName, setEditName] = useState('');

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    setAddingTag(true);
    setMessage('');

    try {
      await createTagMutation.mutateAsync({
        name: newTag.trim(),
      });
      setNewTag('');
      setMessage('Tag added successfully!');
    } catch (error: any) {
      setMessage('Error adding tag: ' + error.message);
    } finally {
      setAddingTag(false);
    }
  };

  const handleUpdateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag || !editName.trim()) return;

    try {
      await updateTagMutation.mutateAsync({
        id: editingTag.id!,
        data: { name: editName.trim() }
      });
      setEditingTag(null);
      setEditName('');
      setMessage('Tag updated successfully!');
    } catch (error: any) {
      setMessage('Error updating tag: ' + error.message);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;

    try {
      await deleteTagMutation.mutateAsync(tagId);
      setMessage('Tag deleted successfully!');
    } catch (error: any) {
      setMessage('Error deleting tag: ' + error.message);
    }
  };

  const startEdit = (tag: Tag) => {
    setEditingTag(tag);
    setEditName(tag.name);
  };

  const cancelEdit = () => {
    setEditingTag(null);
    setEditName('');
  };

  if (tagsLoading) return <div className="text-gray-100">Loading tags...</div>;
  if (tagsError) return <div className="text-red-400">Error loading tags</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Add Tag Form */}
        <div>
          <h2 className="text-2xl font-extralight text-teal-400 mb-6">Add New Tag</h2>
          
          <form onSubmit={handleAddTag} className="space-y-4">
            <div>
              <label className="block text-gray-100 mb-2 font-medium">Tag Name</label>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter tag name..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={addingTag || createTagMutation.isPending}
              className="w-full py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50"
            >
              {(addingTag || createTagMutation.isPending) ? 'Adding...' : 'Add Tag'}
            </button>
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

        {/* Tags List */}
        <div>
          <h3 className="text-xl font-extralight text-teal-400 mb-6">Existing Tags</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {tags.map(tag => (
              <div key={tag.id} className="bg-transparent border border-gray-600 rounded-lg p-4">
                {editingTag?.id === tag.id ? (
                  <form onSubmit={handleUpdateTag} className="space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={updateTagMutation.isPending}
                        className="px-3 py-1 bg-teal-400 text-black text-sm rounded hover:bg-teal-300 transition-colors disabled:opacity-50"
                      >
                        {updateTagMutation.isPending ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-600 text-gray-100 text-sm rounded hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-100 font-medium">{tag.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(tag)}
                        className="px-3 py-1 bg-teal-400 text-black text-sm rounded hover:bg-teal-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag.id!)}
                        className="px-3 py-1 bg-pink-300 text-black text-sm rounded hover:bg-pink-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {tags.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No tags found. Add your first tag!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
