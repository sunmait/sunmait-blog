import CommentEntity from '../../Data/Entities/CommentEntity';

export interface ICommentService {
  getCommentsById(id: number): Promise<CommentEntity>;
  addComment(data: any): Promise<CommentEntity>;
  updateComment(id: number, description: string): Promise<CommentEntity>;
  deleteComment(id: number): Promise<void>;
}
