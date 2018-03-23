import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export default class UserEntity extends Model<UserEntity> {

  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public FirstName: string;

  @Column(DataType.STRING)
  public LastName: string;

  @Column(DataType.STRING)
  public PhotoUrl: string;

}
