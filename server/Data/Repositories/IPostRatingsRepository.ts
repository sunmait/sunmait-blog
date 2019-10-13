import { IRepository } from './IRepository';
import PostRatingsEntity from '../Entities/PostRatingsEntity';

export interface IPostRatingsRepository extends IRepository<PostRatingsEntity> {
  // specific methods
}
