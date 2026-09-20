import { useState } from 'react';
import type { CreatePostType } from '../../types';

interface CreatePostFormProps {
  onSubmit: (data: CreatePostType) => void;
  isPending?: boolean;
  isError?: boolean;
}

export const CreatePostForm = ({
  onSubmit,
  isPending,
  isError,
}: CreatePostFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formAction = (formData: FormData) => {
    const payload: CreatePostType = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      //   image: formData.get('image') as string,
      image: selectedFile,
      content: formData.get('content') as string,
    };

    onSubmit(payload);
  };

  return (
    <form action={formAction} className="space-y-4">
      {isError && (
        <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm">
          Failed to create post.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Author</label>
        <input
          type="text"
          name="author"
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          //   type="text"
          //   name="image"
          //   placeholder="https://..."
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>
      <input />

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          name="content"
          rows={4}
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-amber-300 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-xl cursor-pointer transition duration-300 disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Submit Post'}
      </button>
    </form>
  );
};
