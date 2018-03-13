import { InstallerBase } from './InstallerBase';
import {
  CareerDayRepository,
} from '../../../Data/Repositories/Impl/index';

import {
  ICareerDayRepository,
} from '../../../Data/Repositories/index';

import CareerDayEntity from '../../../Data/Entities/CareerDayEntity';

import { DbContext } from '../../../Data/DbContext';
export class DataInstaller extends InstallerBase {
  public install(): void {
    this.container
      .bind<ICareerDayRepository>('CareerDayRepository')
      .toConstantValue(new CareerDayRepository(CareerDayEntity));
    this.container
      .bind<DbContext>('DbContext')
      .to(DbContext)
      .inSingletonScope();
  }
}
