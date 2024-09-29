import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string, // Name database
  process.env.DATABASE_USER_NAME as string, //User name
  process.env.PASSWORD, //Password
  {
    host: process.env.DATABASE_HOST, //Link hosting
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect success.");
  })
  .catch((error) => {
    console.error("Connect Error: ", error);
  });

export default sequelize;
