import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  IsAfter,
  IsDate,
  Default,
} from 'sequelize-typescript';

import UserEntity from './UserEntity';

@Table({ tableName: 'ChatMessagesInfo' })
export default class MessagesInfoEntity extends Model<MessagesInfoEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  public UserFrom: number;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  public UserTo: number;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  public Date: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  public fromStatus: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public toStatus: string;
}
