import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  IsDate,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import UserEntity from './UserEntity';

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
