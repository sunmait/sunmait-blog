import { injectable, inject } from 'inversify';
import { ITagService } from '../ITagService';
import TagEntity from '../../../Data/Entities/TagEntity';
import { ITagRepository } from '../../../Data/Repositories/index';

@injectable()
export class TagService implements ITagService {
  private readonly _tagRepository: ITagRepository;
  constructor(@inject('TagRepository') tagRepository: ITagRepository) {
    this._tagRepository = tagRepository;
  }

  public async getTags(): Promise<TagEntity[]> {
    const tags = await this._tagRepository.findAll({});
    const information = tags.map(tag => {
      const tagEntity = {
        id: tag.id,
        Text: tag.Text,
      };
      return tagEntity;
    });
    return information as TagEntity[];
  }

  public async getTag(id: number): Promise<TagEntity> {
    const tag = await this._tagRepository.find({ where: { id } });
    if (tag) {
      const information = {
        id: tag.id,
        Text: tag.Text,
      };
      return information as TagEntity;
    } else {
      throw { status: 404, message: 'Not found' };
    }
  }

  public async addTag(data: any): Promise<TagEntity> {
    const tag = new TagEntity(data);

    return this._tagRepository.create(tag);
  }

  public async updateTag(id: number, data: any): Promise<TagEntity> {
    const tag = await this._tagRepository.findById(id);
    tag.id = data.id;
    tag.Text = data.Text;

    return this._tagRepository.update(tag);
  }

  public async deleteTag(id: number): Promise<void> {
    await this._tagRepository.remove({ where: { id } });
  }
}
