export interface ICommentService {
  getComment(): Promise<any>;
  addComment(data: any): Promise<any>;
  updateComment(id: number, description: string): Promise<any>;
  deleteComment(id: number): Promise<void>;
}
