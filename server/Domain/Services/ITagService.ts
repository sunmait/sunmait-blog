import TagEntity from '../../Data/Entities/TagEntity';

export interface ITagService {
  getTags(): Promise<TagEntity[]>;
  getTag(id: number): Promise<TagEntity>;
  addTag(data: any): Promise<TagEntity>;
  updateTag(id: number, data: any): Promise<TagEntity>;
  deleteTag(id: number): Promise<void>;
}
