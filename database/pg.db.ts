import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { GroceryDetails } from "../models/groceryDetails.model";
import { OrderDetails } from "../models/orderDetails.model";
import { UserDetails } from "../models/userDetails.model";
import config from "../config/dev.config";
import { error, success } from "../services/response.service";

dotenv.config();
const sequelize = new Sequelize({
  dialect: "postgres", 
  host: 'host.docker.internal', 
  username: config.pgConfig.user, 
  password: config.pgConfig.password, 
  database: config.pgConfig.database, 
  port: config.pgConfig.port, 
  logging: config.pgConfig.logging, 
  models: [GroceryDetails, OrderDetails, UserDetails],
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    success(true,"POSTGRESQL DATABASE :: PORT: "+config.pgConfig.port);
  } catch (err) {
    console.log(err);
    error("Unable to connect to the database");
  }
};

testConnection();

export default sequelize;
