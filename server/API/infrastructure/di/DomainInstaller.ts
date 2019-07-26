import { InstallerBase } from './InstallerBase';
import {
  IPostService,
  ICommentService,
  IAuthService,
  ICryptoService,
  IUserService,
  ITagService,
} from './../../../Domain/Services/index';
import {
  PostService,
  CommentService,
  AuthService,
  CryptoService,
  UserService,
  TagService,
} from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container.bind<IPostService>('PostService').to(PostService);
    this.container.bind<ICommentService>('CommentService').to(CommentService);
    this.container.bind<ICryptoService>('CryptoService').to(CryptoService);
    this.container.bind<IAuthService>('AuthService').to(AuthService);
    this.container.bind<IUserService>('UserService').to(UserService);
    this.container.bind<ITagService>('TagService').to(TagService);
  }
}
