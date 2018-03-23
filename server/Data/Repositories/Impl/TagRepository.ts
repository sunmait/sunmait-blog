import { injectable } from 'inversify';
import { ITagRepository } from '../ITagRepository';
import TagEntity from '../../Entities/TagEntity';
import { RepositoryBase } from './RepositoryBase';

@injectable()
export class TagRepository extends RepositoryBase<TagEntity>
  implements ITagRepository {
  constructor(tagEntity: TagEntity) {
    super(tagEntity);
  }
}
