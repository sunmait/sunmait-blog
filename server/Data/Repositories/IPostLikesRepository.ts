import { IRepository } from './IRepository';
import PostLikesEntity from '../Entities/PostLikesEntity';

export interface IPostLikesRepository extends IRepository<PostLikesEntity> {
  // specific methods
}
