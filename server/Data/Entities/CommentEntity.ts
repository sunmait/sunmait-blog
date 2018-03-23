import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
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
  public BodyComment: string;
}
