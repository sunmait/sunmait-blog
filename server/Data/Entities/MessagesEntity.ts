import { Table, Column, Model, DataType, AllowNull, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import MessagesInfoEntity from './MessagesInfoEntity';

@Table({ tableName: 'ChatMessages' })
export default class MessagesEntity extends Model<MessagesEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => MessagesInfoEntity)
  @Column(DataType.INTEGER)
  public InfoId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Message: string;
}
