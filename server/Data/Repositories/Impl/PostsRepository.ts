import { injectable } from 'inversify';
import { IPostsRepository } from '../IPostsRepository';
import PostsEntity from '../../Entities/PostsEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class PostsRepository extends RepositoryBase<PostsEntity>
  implements IPostsRepository {
  constructor(postsEntity: PostsEntity) {
    super(postsEntity);
  }
}
