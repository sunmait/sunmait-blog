import {IRepository} from './IRepository';
import TagEntity from '../Entities/TagEntity';

export interface ITagRepository extends IRepository<TagEntity> {
  // specific methods
}
