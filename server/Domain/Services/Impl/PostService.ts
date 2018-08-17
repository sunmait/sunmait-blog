import { injectable, inject } from 'inversify';
import { IPostService } from '../IPostService';
import PostEntity from '../../../Data/Entities/PostEntity';
import UserEntity from '../../../Data/Entities/UserEntity';
import { IPostRepository } from '../../../Data/Repositories/index';

@injectable()
export class PostService implements IPostService {
  private readonly _postRepository: IPostRepository;
  constructor(@inject('PostRepository') postRepository: IPostRepository) {
    this._postRepository = postRepository;
  }

  public async getPosts(countStr: string, offsetStr: string): Promise<PostEntity[]> {
    const options: any = { include: [{ model: UserEntity, attributes: ['FirstName', 'LastName'] }] };
    const count = parseInt(countStr, 10);
    const offset = parseInt(offsetStr, 10);

    if (!isNaN(count) && count >= 0) {
      options.limit = count;
    }
    if (!isNaN(offset) && offset >= 0) {
      options.offset = offset;
    }

    return this._postRepository.findAll(options);
  }

  public async getPostById(id: number): Promise<PostEntity> {
    const post = await this._postRepository.findOne({
      where: { id },
      include: [{ model: UserEntity, attributes: ['FirstName', 'LastName'] }],
    });
    if (post) {
      return post;
    } else {
      throw { status: 404, message: 'Not found' };
    }
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
