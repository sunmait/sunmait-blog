import { InstallerBase } from './InstallerBase';
import {
  UserRepository,
  PostRepository,
  TagRepository,
  CommentRepository,
  PostsTagRepository,
  PostLikesRepository,
  SessionRepository,
  PostRatingsRepository,
} from '../../../Data/Repositories/Impl/index';

import {
  IUserRepository,
  IPostRepository,
  ITagRepository,
  ICommentRepository,
  IPostsTagRepository,
  IPostLikesRepository,
  ISessionRepository,
  IPostRatingsRepository,
} from '../../../Data/Repositories/index';

import PostEntity from '../../../Data/Entities/PostEntity';
import CommentEntity from '../../../Data/Entities/CommentEntity';
import PostsTagEntity from '../../../Data/Entities/PostsTagEntity';
import PostLikesEntity from '../../../Data/Entities/PostLikesEntity';
import TagEntity from '../../../Data/Entities/TagEntity';
import UserEntity from '../../../Data/Entities/UserEntity';
import PostRatingsEntity from '../../../Data/Entities/PostRatingsEntity';

import { DbContext } from '../../../Data/DbContext';
import SessionEntity from '../../../Data/Entities/SessionEntity';
export class DataInstaller extends InstallerBase {
  public install(): void {
    // @ts-ignore
    this.container.bind<IUserRepository>('UserRepository').toConstantValue(new UserRepository(UserEntity));
    // @ts-ignore
    this.container.bind<IPostRepository>('PostRepository').toConstantValue(new PostRepository(PostEntity));
    // @ts-ignore
    this.container.bind<ITagRepository>('TagRepository').toConstantValue(new TagRepository(TagEntity));
    // @ts-ignore
    this.container.bind<ICommentRepository>('CommentRepository').toConstantValue(new CommentRepository(CommentEntity));
    // @ts-ignore
    this.container
      .bind<IPostRatingsRepository>('PostRatingsRepository')
      // @ts-ignore
      .toConstantValue(new PostRatingsRepository(PostRatingsEntity));

    this.container
      .bind<IPostsTagRepository>('PostsTagRepository')
      // @ts-ignore
      .toConstantValue(new PostsTagRepository(PostsTagEntity));

    this.container
      .bind<IPostLikesRepository>('PostLikesRepository')
      // @ts-ignore
      .toConstantValue(new PostLikesRepository(PostLikesEntity));
    // @ts-ignore
    this.container.bind<ISessionRepository>('SessionRepository').toConstantValue(new SessionRepository(SessionEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
