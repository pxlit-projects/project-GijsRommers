export interface Comment {
  id: number;
  postId: number;
  userName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
