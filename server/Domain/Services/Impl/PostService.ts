import { IPostService, IGetPostsOptions } from './../IPostService';
import { injectable, inject } from 'inversify';
import PostEntity from '../../../Data/Entities/PostEntity';
import UserEntity from '../../../Data/Entities/UserEntity';
import PostLikesEntity from '../../../Data/Entities/PostLikesEntity';
import PostRatingsEntity from '../../../Data/Entities/PostRatingsEntity';
import PostsTagEntity from '../../../Data/Entities/PostsTagEntity';
import TagEntity from '../../../Data/Entities/TagEntity';
import { IPostRepository, IPostLikesRepository } from '../../../Data/Repositories/index';
import { IPostsTagRepository, ITagRepository, IPostRatingsRepository } from '../../../Data/Repositories/index';
import { Op } from '../../../Data/DbContext';
import { asyncForEach } from '../../helpers/TagsHelper';
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
  private readonly _postRatingsRepository: IPostRatingsRepository;
  private readonly _postsTagRepository: IPostsTagRepository;
  private readonly _tagRepository: ITagRepository;
  constructor(
    @inject('PostRepository') postRepository: IPostRepository,
    @inject('PostLikesRepository') postLikesRepository: IPostLikesRepository,
    @inject('PostRatingsRepository') postRatingsRepository: IPostRatingsRepository,
    @inject('PostsTagRepository') postsTagRepository: IPostsTagRepository,
    @inject('TagRepository') tagRepository: ITagRepository
  ) {
    this._postRepository = postRepository;
    this._postLikesRepository = postLikesRepository;
    this._postRatingsRepository = postRatingsRepository;
    this._postsTagRepository = postsTagRepository;
    this._tagRepository = tagRepository;
  }

  public async getPosts(params: IGetPostsOptions): Promise<PostEntity[]> {
    const { count: countStr, offset: offsetStr, search, userId, tag } = params;

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
      ],
    };
    const PostTagEnt: any = {
      model: PostsTagEntity,
      include: [
        {
          model: TagEntity,
          attributes: ['id', 'Text'],
        },
      ],
    };
    if (tag) {
      const tagEnt = await this._tagRepository.find({ where: { Text: tag } });
      PostTagEnt.where = { TagId: tagEnt.id };
    }
    options.include.push(PostTagEnt);
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
      post.Tags = post.Tags.map(i => i.Tag);
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

  public async likeOrDislike(PostId: number, UserId: number, UserInfo: object): Promise<any> {
    const like = await this._postLikesRepository.findOne({ where: { PostId, UserId } });
    if (like) {
      const deleteValue = await this._postLikesRepository.remove({ where: { PostId, UserId } });
      if (deleteValue) {
        const dislike = {
          id: like.UserId,
          PostId: like.PostId,
          LikeId: like.id,
        };
        return dislike;
      } else {
        throw new Error('Error post dislike');
      }
    } else {
      const postLike = new PostLikesEntity({ PostId, UserId, UserInfo });
      const createdLike = await this._postLikesRepository.create(postLike);
      const newLike = {
        id: createdLike.UserId,
        PostId: createdLike.PostId,
        LikeId: createdLike.id,
      };
      return newLike;
    }
  }

  public async setRating(PostId: number, UserId: number, Value: number): Promise<any> {
    const rated = await this._postRatingsRepository.findOne({ where: { PostId, UserId } });
    let payload = {};
    if (rated) {
      console.log('Find Bleat!');
      await rated.update({
        Value,
      });
      const { PostId: post, UserId: user, Value: value } = rated.dataValues;
      payload = {
        PostId: post,
        UserId: user,
        Value: value,
      };
    } else {
      console.log('Xui tebe!');
      const postrate = new PostRatingsEntity({ PostId, UserId, Value });
      const addnewRait = await this._postRatingsRepository.create(postrate);
      const { PostId: post, UserId: user, Value: value } = addnewRait.dataValues;
      payload = {
        PostId: post,
        UserId: user,
        Value: value,
      };
    }
    // add average method
    const allRatedPost = await this._postRatingsRepository.findAll({ where: { PostId } });
    const AllPostsValue = [];
    allRatedPost.forEach(element => {
      AllPostsValue.push(element.dataValues.Value);
    });
    const adder = array => {
      let sum1 = 0;
      array.forEach(element => {
        sum1 += element;
      });
      return sum1;
    };
    const sum = adder(AllPostsValue);
    const average = sum / AllPostsValue.length;
    const trueAverage = Math.round(average);
    const payloadWithAverage = {
      ...payload,
      Average: trueAverage,
    };
    console.log('its from post serviece', payloadWithAverage);
    return payloadWithAverage;
  }

  public async addPost(data: any): Promise<PostEntity> {
    const postEntity = new PostEntity(data);
    const post = await this._postRepository.create(postEntity);
    const tags = data.Tags;
    let tag;
    asyncForEach(tags, async el => {
      tag = await this._tagRepository.getOrCreate({ where: { Text: el.Text } });
      await this._postsTagRepository.create(new PostsTagEntity({ TagId: tag[0].id, PostId: post.id }));
    });
    return post;
  }

  public async updatePost(data: IChangePostBody): Promise<PostEntity> {
    const post = await this._postRepository.find({ where: { id: data.idPost } });
    const Tags = await this._postsTagRepository.findAll({ where: { PostId: data.idPost } });
    const apiTags = data.Tags;
    asyncForEach(Tags, async el => {
      if (!apiTags.find(newel => newel.id === el.id)) {
        await this._postsTagRepository.remove({ where: { id: el.id } });
      }
    });
    let tag;
    let newTags;
    if (apiTags) {
      newTags = apiTags.filter(el => !el.hasOwnProperty('id'));
    }
    if (newTags) {
      asyncForEach(apiTags, async el => {
        tag = await this._tagRepository.getOrCreate({ where: { Text: el.Text } });
        await this._postsTagRepository.create(new PostsTagEntity({ TagId: tag[0].id, PostId: post.id }));
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
