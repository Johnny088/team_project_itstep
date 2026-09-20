export interface CreatePostType {
  Title: string;
  author: string;
  content: string;
  image: string;
}

export interface getPostType extends CreatePostType {
  id: number;
  createdAt: string;
  comments: Comment[];
}
