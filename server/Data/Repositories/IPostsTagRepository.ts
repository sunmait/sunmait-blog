import { IRepository } from './IRepository';
import PostsTagEntity from '../Entities/PostsTagEntity';

export interface IPostsTagRepository extends IRepository<PostsTagEntity> {
  // specific methods
}
