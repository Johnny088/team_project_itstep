export interface CreatePostType {
  title: string;
  author: string;
  content: string;
  image: File | string | null;
}

export interface getPostType extends CreatePostType {
  id: number;
  createdAt: string;
  comments: Comment[];
}
