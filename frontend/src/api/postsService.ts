import type { CreatePostType, getPostType } from '../types';
import { api } from './api';

export const addPost = async (postData: CreatePostType) => {
  const formData = new FormData();

  formData.append('title', postData.title);
  formData.append('author', postData.author);
  formData.append('content', postData.content);

  if (postData.image instanceof File) {
    formData.append('image', postData.image);
  }
  const { data } = await api.post<CreatePostType>('api/topics/', formData);

  console.log(data); // <<<<<<<<<<<<<<====================== temp

  return data;
};

export const getPosts = async () => {
  const { data } = await api.get<getPostType[]>('api/topics/');

  return data;
};
