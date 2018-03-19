import { InstallerBase } from './InstallerBase';
import {
  PostsRepository,
} from '../../../Data/Repositories/Impl/index';

import {
  IPostsRepository,
} from '../../../Data/Repositories/index';

import PostsEntity from '../../../Data/Entities/PostsEntity';

import { DbContext } from '../../../Data/DbContext';
export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<IPostsRepository>('PostsRepository')
      .toConstantValue(new PostsRepository(PostsEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
