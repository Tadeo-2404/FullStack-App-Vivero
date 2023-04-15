import { Sequelize } from "sequelize"; //usamos sequelize
import dotenv from 'dotenv';
dotenv.config(); //usamos variables de entorno

// conexion base de datos
const sequelize = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USUARIO, process.env.DB_USER_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

export default sequelize; //exportamos conexion