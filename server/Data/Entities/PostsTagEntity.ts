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
import TagEntity from './TagEntity';

@Table({ tableName: 'PostsTag' })
export default class PostsTagEntity extends Model<PostsTagEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => PostEntity)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public PostId: number;

  @ForeignKey(() => TagEntity)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public TagId: number;

  @BelongsTo(() => TagEntity)
  public Tag: TagEntity;
}
