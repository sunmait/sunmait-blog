import { IRepository } from './IRepository';
import PostEntity from '../Entities/PostEntity';

export interface IPostRepository extends IRepository<PostEntity> {
  // specific methods
}
