import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  IsDate,
  PrimaryKey,
  Unique,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'Posts' })
export default class PostsEntity extends Model<PostsEntity> {

  @Unique
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public idPosts: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public idUser: number;

  @IsDate
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  public CreatedAt: Date;

  @IsDate
  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  public UpdatedAt: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  public Description: string;
}
