import { InstallerBase } from './InstallerBase';
import {
  ICareerDayService,
} from './../../../Domain/Services/index';
import {
  CareerDayService,
} from './../../../Domain/Services/Impl/index';

export class DomainInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ICareerDayService>('CareerDayService')
      .to(CareerDayService);
  }
}
