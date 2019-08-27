import { IPostService, IGetPostsOptions } from './../IPostService';
import { injectable, inject } from 'inversify';
import PostEntity from '../../../Data/Entities/PostEntity';
import UserEntity from '../../../Data/Entities/UserEntity';
import PostLikesEntity from '../../../Data/Entities/PostLikesEntity';
import PostsTagEntity from '../../../Data/Entities/PostsTagEntity';
import TagEntity from '../../../Data/Entities/TagEntity';
import { IPostRepository, IPostLikesRepository } from '../../../Data/Repositories/index';
import { IPostsTagRepository,  ITagRepository } from '../../../Data/Repositories/index';
import { Op } from '../../../Data/DbContext';

export interface ITag {
    id: number;
    Text: string;
  }

export interface IChangePostBody {
    Title: string;
    Description: string;
    ImageUrl: string;
    idPost: number;
    Tags: ITag[];
  }

@injectable()
export class PostService implements IPostService {
  private readonly _postRepository: IPostRepository;
  private readonly _postLikesRepository: IPostLikesRepository;
  private readonly _postsTagRepository: IPostsTagRepository;
  private readonly _tagRepository: ITagRepository;
  constructor(
    @inject('PostRepository') postRepository: IPostRepository,
    @inject('PostLikesRepository') postLikesRepository: IPostLikesRepository,
    @inject('PostsTagRepository') postsTagRepository: IPostsTagRepository,
    @inject('TagRepository') tagRepository: ITagRepository
  ) {
    this._postRepository = postRepository;
    this._postLikesRepository = postLikesRepository;
    this._postsTagRepository = postsTagRepository;
    this._tagRepository = tagRepository;
  }

  public async getPosts(params: IGetPostsOptions): Promise<PostEntity[]> {
    const { count: countStr, offset: offsetStr, search, userId } = params;
    const options: any = {
      where: {},
      include: [
        { model: UserEntity, attributes: ['FirstName', 'LastName'] },
        {
          model: PostLikesEntity,
          include: [
            {
              model: UserEntity,
              attributes: ['id', 'FirstName', 'LastName', 'PhotoUrl'],
            },
          ],
        },
        {
          model: PostsTagEntity,
          include: [
            {
              model: TagEntity,
              attributes: ['id', 'Text'],
            },
          ],
        },
      ],
    };
    const count = parseInt(countStr, 10);
    const offset = parseInt(offsetStr, 10);

    if (!isNaN(count) && count >= 0) {
      options.limit = count;
    }
    if (!isNaN(offset) && offset >= 0) {
      options.offset = offset;
    }
    if (search) {
      options.where = {
        ...options.where,
        Title: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    if (userId !== undefined) {
      options.where = {
        ...options.where,
        userId,
      };
    }

    options.order = [['CreatedAt', 'DESC']];

    const posts = (await this._postRepository.findAll(options)).map(el => el.get({ plain: true }));

    return posts.map(post => {
      post.Tags = post.Tags.map(tag => tag.Tag);
      post.Likes = post.Likes.map(like => like.UserInfo);
      return post;
    });
  }

  public async getPostById(id: number): Promise<PostEntity> {
    const options: any = {
      where: { id },
      include: [
        { model: UserEntity, attributes: ['FirstName', 'LastName'] },
        {
          model: PostLikesEntity,
          include: [
            {
              model: UserEntity,
              attributes: ['id', 'FirstName', 'LastName', 'PhotoUrl'],
            },
          ],
        },
        {
          model: PostsTagEntity,
          include: [
            {
              model: TagEntity,
              attributes: ['id', 'Text'],
            },
          ],
        },
      ],
    };
    const post = (await this._postRepository.findOne(options)).get({ plain: true });
    if (post) {
      post.Tags = post.Tags.map(tag => tag.Tag);
      post.Likes = post.Likes.map(like => like.UserInfo);
      return post;
    } else {
      throw { status: 404, message: 'Not found' };
    }
  }

  public async likeOrDislike(PostId: number, UserId: number): Promise<any> {
    const like = await this._postLikesRepository.findOne({ where: { PostId, UserId } });
    if (like) {
      await this._postLikesRepository.remove({ where: { PostId, UserId } });
    } else {
      const postLike = new PostLikesEntity({ PostId, UserId });
      await this._postLikesRepository.create(postLike);
    }
  }

  public async addPost(data: any): Promise<PostEntity> {
    const post = new PostEntity(data);

    return this._postRepository.create(post);
  }

  public async updatePost(data: IChangePostBody): Promise<PostEntity> {

    const post = await this._postRepository.find({ where: { id: data.idPost } });
    const Tags = await this._postsTagRepository.findAll({where: {PostId: data.idPost}});
    const apiTags = data.Tags;
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    asyncForEach(Tags, async el => {
          if (!apiTags.find(newel => newel.id === el.id)) {
            await this._postsTagRepository.remove({where: {id: el.id}});
          }
        }
    );
    let tag;
    let newTags;
    if (apiTags) {
      newTags = apiTags.filter(el => !el.hasOwnProperty('id'));
    }
    if (newTags) {
      asyncForEach(apiTags, async el => {
        tag = await this._tagRepository.getOrCreate({where: {Text: el.Text}});
        await this._postsTagRepository.create(new PostsTagEntity({TagId: tag[0].id, PostId: post.id }));
      });
    }
    post.Description = data.Description;
    post.Title = data.Title;
    post.ImageUrl = data.ImageUrl;
    post.UpdatedAt = new Date();
    return this._postRepository.update(post);
  }

  public async deletePost(id: number): Promise<PostEntity[]> {
    await this._postRepository.remove({ where: { id } });
    return this._postRepository.findAll({ order: [['CreatedAt', 'DESC']] });
  }
}
