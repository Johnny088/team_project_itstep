import type { CreatePostType, getPostType } from '../types';
import { api } from './api';

export const addPost = async (postData: CreatePostType) => {
  const { data } = await api.post<CreatePostType>(
    '/topic-list-create',
    postData
  );

  console.log(data); // <<<<<<<<<<<<<<====================== temp

  return data;
};

export const getPosts = async () => {
  const { data } = await api.get<getPostType[]>('/topic-detail');

  return data;
};
