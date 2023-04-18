//deperencias
import express, { json } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

//instancias
import sequelize from './db/db.js'; //conexion base de datos

//instancias interactivas
import clienteRoutes from './routes/clienteRoutes.js'; //rutas cliente
import adminRoutes from './routes/adminRoutes.js'; //rutas admin

//instancias de consulta API
import productoRoutes from './routes/productoRoutes.js'; //rutas producto
import sustratoRoutes from './routes/sustratoRoutes.js' //rutas sustratos

//conexion base de datos
try {
    await sequelize.authenticate();
    console.log(`Base de datos conectada correctamente`);
} catch (error) {
    console.log(error);
}

//instancia de app express
const app = express();
const port = 3000 || process.env.PORT; //instancia de puerto

app.use(json()); //habilitamos formato json
app.use(cors()); //habilitamos cors
app.use(cookieParser()); //habilitamos las cookies
dotenv.config(); //habilitamos variables de entorno

//entidades interactivas
app.use('/', clienteRoutes);
app.use('/admin', adminRoutes);

//entidades para consulta API
app.use('/api/productos', productoRoutes);
app.use('/api/sustratos', sustratoRoutes);

app.listen(port, () => {
    console.log(`APP WORKING ON PORT ${port}`)
});