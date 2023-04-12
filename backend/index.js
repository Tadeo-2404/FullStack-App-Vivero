//deperencias
import express, { json } from 'express';
import dotenv from "dotenv";
import cors from "cors";

//instancias
import db from './db/db.js';
import clienteRoutes from './routes/clienteRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

//conexion base de datos
try {
    await db.authenticate();
    console.log(`Base de datos conectada correctamente`);
} catch (error) {
    console.log(error);
}

//instancia de app express
const app = express();
const port = 3000 || process.env.PORT; //instancia de puerto

app.use(json()); //habilitamos formato json
app.use(cors()); //habilitamos cors
dotenv.config(); //habilitamos variables de entorno

app.use('/cliente', clienteRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`APP WORKING ON PORT ${port}`)
});