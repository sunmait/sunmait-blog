import { injectable } from 'inversify';
import { IPostLikesRepository } from '../IPostLikesRepository';
import PostLikesEntity from '../../Entities/PostLikesEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class PostLikesRepository extends RepositoryBase<PostLikesEntity> implements IPostLikesRepository {
  constructor(postLikesEntity: PostLikesEntity) {
    super(postLikesEntity);
  }
}
