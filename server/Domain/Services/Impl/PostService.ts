import { injectable, inject } from 'inversify';
import { IPostService } from '../IPostService';
import PostEntity from '../../../Data/Entities/PostEntity';
import { IPostRepository } from '../../../Data/Repositories/index';

@injectable()
export class PostService implements IPostService {
  private readonly _postRepository: IPostRepository;
  constructor(
    @inject('PostRepository') postRepository: IPostRepository,
  ) {
    this._postRepository = postRepository;
  }

  public async getPost(): Promise<PostEntity[]> {
    return this._postRepository.findAll({});
  }

  public async addPost(data: any): Promise<PostEntity> {
      const post = new PostEntity(data);

      return this._postRepository.create(post);
  }

  public async updatePost(id: number, descriprion: any) {
    const post = await this._postRepository.findById(id);
    post.UpdatedAt = new Date();
    post.Description = descriprion;

    return this._postRepository.update(post);
  }

  public async deletePost(id: number): Promise<void> {
    await this._postRepository.remove({ where: { id } });
  }

}
