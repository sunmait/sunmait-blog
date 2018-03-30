export interface IPostService {
  getPost(): Promise<any>;
  addPost(data: any): Promise<any>;
  updatePost(id: number, description: string): Promise<any>;
  deletePost(id: number): Promise<void>;
}
