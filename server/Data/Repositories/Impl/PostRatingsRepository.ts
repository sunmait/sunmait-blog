import { injectable } from 'inversify';
import { IPostRatingsRepository } from '../IPostRatingsRepository';
import PostRatingsEntity from '../../Entities/PostRatingsEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class PostRatingsRepository extends RepositoryBase<PostRatingsEntity> implements IPostRatingsRepository {
  constructor(postRatingsEntity: PostRatingsEntity) {
    super(postRatingsEntity);
  }
}
