import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUrl,
  Default,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  IsDate,
  UpdatedAt,
  Unique,
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

  @Column(DataType.DATE)
  public BornDate: Date;

  @IsUrl
  @Default('https://vk.com/images/camera_200.png')
  @Column(DataType.STRING)
  public PhotoUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public PasswordHash: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public Login: string;

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
}
