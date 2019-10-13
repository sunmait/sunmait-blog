import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  // ForeignKey,
  PrimaryKey,
  AutoIncrement,
  // BelongsTo,
} from 'sequelize-typescript';

// import PostEntity from './PostEntity';
// import UserEntity from './UserEntity';

@Table({ tableName: 'PostRatings' })
export default class PostRatingsEntity extends Model<PostRatingsEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.INTEGER)
  public UserId: number;

  @Column(DataType.INTEGER)
  public PostId: number;

  @Column(DataType.INTEGER)
  public Value: number;
}
