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
  PrimaryKey,
  Unique,
  Default,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'CareerDays' })
export default class CareerDayEntity extends Model<CareerDayEntity> {
  @Unique
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Default(new Date())
  @CreatedAt
  @Column(DataType.DATE)
  public CreatedAt: Date;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Default(new Date())
  @UpdatedAt
  @Column(DataType.DATE)
  public UpdatedAt: Date;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public Archived: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public EmployeeExternalId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public UnitManagerExternalId: number;

  @IsDate
  @IsAfter('2018-01-01')
  @AllowNull(false)
  @Column(DataType.DATE)
  public InterviewDate: Date;
}
