import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost, getPosts, addComment } from '../../api/postsService';
import { useEffect, useState } from 'react';
import { CreatePostForm } from '../../components/CreatePostForm/CreatePostForm';
import type { CreateCommentType, CreatePostType } from '../../types';

import { getUser } from '../../api/authService';

export const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(
    null
  );
  const [commentContent, setCommentContent] = useState('');

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

  const commentMutation = useMutation({
    mutationFn: (newComment: CreateCommentType) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });

      setActiveCommentPostId(null);
      setCommentContent('');
    },
  });

  const handleCommentSubmit = (
    postId: number,
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    commentMutation.mutate({
      topic: postId,
      content: commentContent,
    });
    setCommentContent('');
    setActiveCommentPostId(null);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <section className="mx-9 mt-24">
      <div className="flex items-center flex-col">
        <h1 className=" text-amber-300 mb-16">Forum main page</h1>

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
            <li key={post.id} className="mb-20">
              <div className="flex">
                <div className="me-16">
                  <p className="mb-6">{post.author_name}</p>
                  <img
                    className="w-3xs h-80"
                    src={
                      typeof post.image === 'string' &&
                      post.image.startsWith('http')
                        ? post.image
                        : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}${post.image}`
                    }
                    alt="cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex  mb-7">
                    <p className="me-9">{`${post.title}`}</p>
                    <p>{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                  <p>{post.content}</p>
                  {/* ///////////////////////////// comments /////////////////////// */}
                  <div className="mb-4 flex flex-col gap-2">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm"
                        >
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span className="font-semibold text-amber-300">
                              {comment.author_name}
                            </span>
                            <span>
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-white">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500 italic">
                        No comments yet.
                      </p>
                    )}
                  </div>
                  {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                  <button
                    onClick={() => {
                      setActiveCommentPostId(
                        activeCommentPostId === post.id ? null : post.id
                      );
                      setCommentContent('');
                    }}
                    className="self-start text-sm text-amber-300 hover:underline cursor-pointer mb-4"
                  >
                    {activeCommentPostId === post.id ? 'Cancel' : 'Reply'}
                  </button>
                  {activeCommentPostId === post.id && (
                    <form
                      onSubmit={(e) => handleCommentSubmit(post.id, e)}
                      className="flex flex-col gap-2 mt-2"
                    >
                      <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write a comment..."
                        rows={2}
                        required
                        className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-300"
                      />
                      <button
                        type="submit"
                        className="self-start bg-amber-300 text-black text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-400 cursor-pointer"
                      >
                        Post Comment
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
