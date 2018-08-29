import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';

import PostEntity from './PostEntity';
import UserEntity from './UserEntity';

@Table({ tableName: 'PostLikes' })
export default class PostLikesEntity extends Model<PostLikesEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => PostEntity)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public PostId: number;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public UserId: number;

  @BelongsTo(() => UserEntity)
  public UserInfo: UserEntity;
}
