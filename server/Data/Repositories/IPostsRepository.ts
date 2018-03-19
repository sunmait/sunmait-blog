import { IRepository } from './IRepository';
import PostsEntity from '../Entities/PostsEntity';

export interface IPostsRepository extends IRepository<PostsEntity> {
  // specific methods
}
