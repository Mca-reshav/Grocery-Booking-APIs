import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    AllowNull,
  } from "sequelize-typescript";
  
  @Table({
    tableName: "order_details",
    timestamps: true,  // To manage createdAt automatically
    updatedAt: false,  // No updated_at field in the given table
  })
  export class OrderDetails extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @AllowNull(false)
    @Column({
      type: (DataType.INTEGER),
      field: 'user_id'
    })
    userId!: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.INTEGER,
      field: 'grocery_id'
    })
    groceryId!: number;
  
    @AllowNull(false)
    @Column(DataType.INTEGER)
    quantity!: number;
  
    @AllowNull(false)
    @Column({
      type: DataType.DECIMAL(10, 2),
      field: 'total_price'
    })
    totalPrice!: number;
  
    @CreatedAt
    @Column({ field: "created_at" })
    createdAt!: Date;
  }
  