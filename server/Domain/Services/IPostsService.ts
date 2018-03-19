export interface IPostsService {
  getPostWithId(PostId: number): Promise<any>;
  addPost(data: any): Promise<any>;
  updatePost(idPost: number, description: string): Promise<any>;
  deletePost(idPost: number): Promise<void>;
}
