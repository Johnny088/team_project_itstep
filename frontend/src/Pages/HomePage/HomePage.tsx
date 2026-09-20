import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost, getPosts } from '../../api/postsService';
import { useState } from 'react';
import { CreatePostForm } from '../../components/CreatePostForm/CreatePostForm';
import type { CreatePostType } from '../../types';

export const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPosts(),
    retry: 1,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newPost: CreatePostType) => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      setIsFormOpen(false);
    },
  });
  const backendUrl =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
      ? 'http://127.0.0.1:8000'
      : window.location.origin;
  return (
    <section className="mx-5 mt-24">
      <div className="flex items-center flex-col">
        <h1 className=" text-amber-300 mb-16">Welcome to the home page</h1>

        <button
          className="bg-white text-black p-2 rounded-xl cursor-pointer hover:bg-gray-400 duration-300 mb-16"
          onClick={() => {
            setIsFormOpen((prev) => !prev);
          }}
        >
          create new post
        </button>
        {isFormOpen && (
          <CreatePostForm
            onSubmit={(data) => mutate(data)}
            isPending={isPending}
            isError={isError}
          />
        )}
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div>
                <img
                  className="w-3xs h-80"
                  src={
                    typeof post.image === 'string' &&
                    post.image.startsWith('http')
                      ? post.image
                      : `http://127.0.0.1:8000${post.image}`
                  }
                  alt="photo"
                />
                <p>{post.author}</p>
                <p>{post.title}</p>
                <p>{post.content}</p>
                <p>{post.createdAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
