import { InstallerBase } from './InstallerBase';
import {
  IPostsService,
} from './../../../Domain/Services/index';
import {
  PostsService,
} from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<IPostsService>('PostsService')
      .to(PostsService);
  }
}
