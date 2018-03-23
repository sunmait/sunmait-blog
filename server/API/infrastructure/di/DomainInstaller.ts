import { InstallerBase } from './InstallerBase';
import {
  IPostService,
} from './../../../Domain/Services/index';
import {
  PostService,
} from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<IPostService>('PostService')
      .to(PostService);
  }
}
