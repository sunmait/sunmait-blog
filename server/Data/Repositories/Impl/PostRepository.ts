import { injectable } from 'inversify';
import { IPostRepository } from '../IPostRepository';
import PostEntity from '../../Entities/PostEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class PostRepository extends RepositoryBase<PostEntity>
  implements IPostRepository {
  constructor(postEntity: PostEntity) {
    super(postEntity);
  }
}
