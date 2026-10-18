import { useAuthStore } from '../stores/authStore';
import type { CreatePostType, GetPostType, CreateCommentType } from '../types';
import { api } from './api';

export const addPost = async (postData: CreatePostType) => {
  const formData = new FormData();

  formData.append('title', postData.title);

  if (postData.author_name) {
    formData.append('author_name', postData.author_name);
  }

  formData.append('content', postData.content);

  if (postData.image instanceof File) {
    formData.append('image', postData.image);
  }
  console.log(111, ...formData);

  const { data } = await api.post<CreatePostType>('api/topics/', formData);

  console.log(data); // <<<<<<<<<<<<<<====================== temp

  return data;
};

export const getPosts = async () => {
  const { data } = await api.get<{ results: GetPostType[] }>('api/topics/');

  return data.results;
};

export const addComment = async (commentData: CreateCommentType) => {
  const author = useAuthStore.getState().user?.username;
  const payload = {
    ...commentData,
    author_name: author,
  };
  const { data } = await api.post('api/comments/', payload);

  return data;
};
