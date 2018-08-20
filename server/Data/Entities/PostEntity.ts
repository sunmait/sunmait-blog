import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  IsDate,
  IsAfter,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import UserEntity from './UserEntity';
import PostLikesEntity from './PostLikesEntity';

@Table({ tableName: 'Posts' })
export default class PostEntity extends Model<PostEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @AllowNull(false)
  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  public UserId: number;

  @BelongsTo(() => UserEntity)
  public Author: UserEntity;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  public CreatedAt: Date;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  public UpdatedAt: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public ImageUrl: string;

  @HasMany(() => PostLikesEntity)
  public Likes: PostLikesEntity[];
}
