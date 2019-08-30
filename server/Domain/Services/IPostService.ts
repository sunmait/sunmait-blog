import PostEntity from '../../Data/Entities/PostEntity';
export interface IGetPostsOptions {
  count: string;
  offset: string;
  search?: string;
  userId?: number;
  tag?: number;
}

export interface IPostService {
  getPosts(params: IGetPostsOptions): Promise<PostEntity[]>;
  getPostById(id: number): Promise<PostEntity>;
  addPost(data: any): Promise<PostEntity>;
  updatePost(data: any): Promise<PostEntity>;
  deletePost(id: number): Promise<PostEntity[]>;
  likeOrDislike(postId: number, userId: number): Promise<any>;
}
