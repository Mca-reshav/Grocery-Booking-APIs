import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    CreatedAt,
    AllowNull,
    Default,
  } from "sequelize-typescript";
  
  @Table({
    tableName: "user_details",
    timestamps: true,  
    updatedAt: false, 
  })
  export class UserDetails extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @AllowNull(false)
    @Column(DataType.STRING(25))
    name!: string;
  
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(50))
    email!: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(15))
    contact!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING(255))
    password!: string;
  
    @AllowNull(false)
    @Default('2')
    @Column(DataType.SMALLINT)
    role!: number;
  
    @CreatedAt
    @Column({ field: "created_at" })
    createdAt!: Date;
  }
  