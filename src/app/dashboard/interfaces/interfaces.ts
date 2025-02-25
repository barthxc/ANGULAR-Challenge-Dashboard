export interface UserResponse {
  id: string;
  name: string;
  posts: number;
  comments: number;
}

export interface PostResponse {
  id: string;
  title: string;
  authorId: string;
  comments: number;
}

export interface CommentResponse {
  id: string;
  text: string;
  userId: string;
  postId: string;
}
