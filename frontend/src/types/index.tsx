export interface CreatePostType {
  title: string;
  author_name: string;
  content: string;
  image: File | string | null;
}
export interface Comment {
  id: number;
  content: string;
  author_name: string;
  image?: string | null;
  created_at: string;
}

export interface GetPostType extends CreatePostType {
  id: number;
  created_at: Date;
  comments: Comment[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthDataType {
  usernameOrEmail?: string;
  email?: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}
