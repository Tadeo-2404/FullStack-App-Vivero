//deperencias
import express, { json } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

//instancias
import sequelize from './db/db.js'; //conexion base de datos

//instancias interactivas
import adminRoutes from './routes/adminRoutes.js'; //rutas admin

//instancias de consulta API
import productoRoutes from './routes/productoRoutes.js'; //rutas producto
import proveedorRoutes from './routes/proveedorRoutes.js' //rutas proveedor
import ventasRoutes from './routes/ventaRoutes.js' //rutas para ventas
import ventaProductosRoutes from './routes/ventaProductosRoutes.js' //rutas para venta_producto
import compraRoutes from './routes/compraRoutes.js' //rutas para compras
import compraProductoRoutes from './routes/compraProductoRoutes.js';
import proveedorProductoRoutes from './routes/proveedorProductoRoutes.js' //rutas para proveedor producto

//conexion base de datos
try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
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
app.use('/admin', adminRoutes);

//entidades para consulta API
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/venta-producto', ventaProductosRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/compra-producto', compraProductoRoutes);
app.use('/api/proveedor-producto', proveedorProductoRoutes);

app.listen(port, () => {
    console.log(`APP WORKING ON PORT ${port}`)
});