import { injectable } from 'inversify';
import { ICommentRepository } from '../ICommentRepository';
import CommentEntity from '../../Entities/CommentEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class CommentRepository extends RepositoryBase<CommentEntity>
  implements ICommentRepository {
  constructor(commentEntity: CommentEntity) {
    super(commentEntity);
  }
}
