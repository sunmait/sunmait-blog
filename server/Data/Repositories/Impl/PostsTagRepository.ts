import { injectable } from 'inversify';
import { IPostsTagRepository } from '../IPostsTagRepository';
import PostsTagEntity from '../../Entities/PostsTagEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class PostsTagRepository extends RepositoryBase<PostsTagEntity>
  implements IPostsTagRepository {
  constructor(postsTagEntity: PostsTagEntity) {
    super(postsTagEntity);
  }
}
