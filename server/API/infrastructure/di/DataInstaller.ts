import { InstallerBase } from './InstallerBase';
import {
  PostRepository,
} from '../../../Data/Repositories/Impl/index';

import {
  IPostRepository,
} from '../../../Data/Repositories/index';

import PostEntity from '../../../Data/Entities/PostEntity';

import { DbContext } from '../../../Data/DbContext';
export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<IPostRepository>('PostRepository')
      .toConstantValue(new PostRepository(PostEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
