export interface CreatePostType {
  title: string;
  author_name: string;
  content: string;
  image: File | string | null;
}

export interface GetPostType extends CreatePostType {
  id: number;
  created_at: Date;
  comments: Comment[];
}
