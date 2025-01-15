import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "grocery_details",
  timestamps: true,
})
export class GroceryDetails extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column(DataType.STRING(50))
  name!: string;

  @Column({
    type: DataType.STRING(50),
    field: "sub_name"
  })
  subName!: string;

  @Column({
    type: DataType.STRING(50),
    field: "created_by"
  })
  createdBy!: string;

  @Column({
    type: DataType.STRING(50),
    field: "updated_by"
  })
  updatedBy!: string;

  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    field: "inventory_level",
  })
  inventoryLevel!: number;

  @Column({
    type: DataType.CHAR(1),
    field: 'category_id'
  })
  categoryId?: number;

  @Default('1')
  @Column({
    type: DataType.CHAR(1),
    field: 'grocery_type'
  })
  groceryType?: string;

  @Default(0)
  @Column(DataType.DECIMAL(10,2))
  type?: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt!: Date;

  @Column({ field: "updated_at" })
  updatedAt!: Date;
}
