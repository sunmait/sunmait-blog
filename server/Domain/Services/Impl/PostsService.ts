import { injectable, inject } from 'inversify';
import { IPostsService } from '../IPostsService';
import PostsEntity from '../../../Data/Entities/PostsEntity';
import { IPostsRepository } from '../../../Data/Repositories/index';

@injectable()
export class PostsService implements IPostsService {
  private readonly _postsRepository: IPostsRepository;
  constructor(
    @inject('PostsRepository') postsRepository: IPostsRepository,
  ) {
    this._postsRepository = postsRepository;
  }

  public async getPostWithId(
    PostId: number,
  ): Promise<PostsEntity[]> {
    return this._postsRepository.findAll({
      where: { PostId },
    });
  }

  public async addPost(data: any): Promise<PostsEntity> {
      const post = new PostsEntity(data);

      return this._postsRepository.create(post);
  }

  public async deletePost(idPost: number): Promise<void> {
    await this._postsRepository.remove({ where: { idPost } });
  }

  public async updatePost(idPost: number, descriprion: any) {
    const post = await this._postsRepository.findById(idPost);

    post.UpdatedAt = new Date();
    post.Description = descriprion;
    return this._postsRepository.update(post);
  }

}
