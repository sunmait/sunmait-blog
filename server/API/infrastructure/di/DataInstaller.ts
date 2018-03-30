import { InstallerBase } from './InstallerBase';
import {
  PostRepository,
  CommentRepository,
} from '../../../Data/Repositories/Impl/index';

import {
  IPostRepository,
  ICommentRepository,
} from '../../../Data/Repositories/index';

import PostEntity from '../../../Data/Entities/PostEntity';
import CommentEntity from '../../../Data/Entities/CommentEntity';

import { DbContext } from '../../../Data/DbContext';
export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<IPostRepository>('PostRepository')
      .toConstantValue(new PostRepository(PostEntity));
    this.container
      .bind<ICommentRepository>('CommentRepository')
      .toConstantValue(new CommentRepository(CommentEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
