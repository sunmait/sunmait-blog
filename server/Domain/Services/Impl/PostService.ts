import { injectable, inject } from 'inversify';
import { IPostService } from '../IPostService';
import PostEntity from '../../../Data/Entities/PostEntity';
import { IPostRepository } from '../../../Data/Repositories/index';

@injectable()
export class PostService implements IPostService {
  private readonly _postRepository: IPostRepository;
  constructor(@inject('PostRepository') postRepository: IPostRepository) {
    this._postRepository = postRepository;
  }

  public async getPosts(): Promise<PostEntity[]> {
    return this._postRepository.findAll({});
  }

  public async addPost(data: any): Promise<PostEntity> {
    const post = new PostEntity(data);

    return this._postRepository.create(post);
  }

  public async updatePost(data: any): Promise<PostEntity> {
    const post = await this._postRepository.find({ where: { id: data.idPost } });

    post.Description = data.Description;
    post.Title = data.Title;
    post.ImageUrl = data.ImageUrl;
    post.UpdatedAt = new Date();

    return this._postRepository.update(post);
  }

  public async deletePost(id: number): Promise<PostEntity[]> {
    await this._postRepository.remove({ where: { id } });
    return this._postRepository.findAll({});
  }
}
