import { InstallerBase } from './InstallerBase';
import {
  IPostService,
  ICommentService,
} from './../../../Domain/Services/index';
import {
  PostService,
  CommentService,
} from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<IPostService>('PostService')
      .to(PostService);
    this.container
      .bind<ICommentService>('CommentService')
      .to(CommentService);
  }
}
