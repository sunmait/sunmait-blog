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

import PostEntity from './PostEntity';
import UserEntity from './UserEntity';

@Table({ tableName: 'Comments' })
export default class CommentEntity extends Model<CommentEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => PostEntity)
  @Column(DataType.INTEGER)
  public PostId: number;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  public UserId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Text: string;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  public CreatedAt: Date;
}
