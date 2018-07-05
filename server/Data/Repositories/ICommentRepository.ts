import {IRepository} from './IRepository';
import CommentEntity from '../Entities/CommentEntity';

export interface ICommentRepository extends IRepository<CommentEntity> {
  // specific methods
}
