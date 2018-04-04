import PostEntity from '../../Data/Entities/PostEntity';

export interface IPostService {
  getPosts(): Promise<PostEntity[]>;
  addPost(data: any): Promise<PostEntity>;
  updatePost(id: number, description: string): Promise<PostEntity>;
  deletePost(id: number): Promise<void>;
}
