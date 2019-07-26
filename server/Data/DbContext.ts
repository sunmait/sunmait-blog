import { Sequelize } from 'sequelize-typescript';
import { inject, injectable } from 'inversify';
import { ISettingsProvider, IDatabaseSettings } from '../API/infrastructure/index';

export const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

@injectable()
export class DbContext {
  private _sequelize: Sequelize;
  private _settingsProvider: ISettingsProvider;
  constructor(@inject('SettingsProvider') settingsProvider: ISettingsProvider) {
    this._settingsProvider = settingsProvider;
    const settings: IDatabaseSettings = this._settingsProvider.getDatabaseSettings();
    this._sequelize = new Sequelize({
      dialect: settings.dialect,
      database: settings.database,
      username: settings.username,
      password: settings.password,
      host: settings.host,
      port: settings.port,
      modelPaths: [__dirname + '/Entities'],
      operatorsAliases,
      define: {
        charset: 'utf8mb4',
        underscored: true,
        underscoredAll: true,
      },
    });
  }

  public async connect(): Promise<void> {
    await this._sequelize.sync();
  }
}
