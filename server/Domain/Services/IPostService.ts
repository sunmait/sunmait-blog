import PostEntity from '../../Data/Entities/PostEntity';

export interface IPostService {
  getPosts(countStr: string, offsetStr: string, search: [string]): Promise<PostEntity[]>;
  getPostById(id: number): Promise<PostEntity>;
  addPost(data: any): Promise<PostEntity>;
  updatePost(data: any): Promise<PostEntity>;
  deletePost(id: number): Promise<PostEntity[]>;
  likeOrDislike(postId: number, userId: number): Promise<any>;
}
