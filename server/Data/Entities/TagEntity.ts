import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'Tags' })
export default class TagEntity extends Model<TagEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  // @IsDate
  @AllowNull(false)
  @Column(DataType.STRING)
  public Text: string;
}
