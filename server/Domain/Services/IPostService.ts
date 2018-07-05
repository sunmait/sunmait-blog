import PostEntity from '../../Data/Entities/PostEntity';

export interface IPostService {
  getPosts(): Promise<PostEntity[]>;
  addPost(data: any): Promise<PostEntity>;
  updatePost(data: any): Promise<PostEntity>;
  deletePost(id: number): Promise<PostEntity[]>;
}
