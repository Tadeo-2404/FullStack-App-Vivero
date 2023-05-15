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

//conexion base de datos
try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    //? Trigger que actualiza el total de una venta
    sequelize.query(`
        -- FUNCION
        CREATE OR REPLACE FUNCTION actualizarTotal() RETURNS TRIGGER AS $$
        DECLARE
            dinero_total NUMERIC(10, 2);
        BEGIN
            -- Calcula el total
            dinero_total := (
                SELECT sum(subtotal)
                FROM "VentaProducto"
                GROUP BY id_venta
                HAVING id_venta=NEW.id_venta
            );
            
            -- Actualiza el total de la venta
            UPDATE "Venta"
            SET total=dinero_total
            WHERE id=NEW.id_venta;
            
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        DROP TRIGGER IF EXISTS calculoTotal ON "VentaProducto";

        -- TRIGGER
        CREATE TRIGGER calculoTotal
        AFTER INSERT OR UPDATE
        ON "VentaProducto"
        FOR EACH ROW EXECUTE PROCEDURE actualizarTotal();
    `);
    //? Trigger que le agrega la fecha actual a una venta
    sequelize.query(`
        CREATE OR REPLACE FUNCTION agregarFecha() RETURNS TRIGGER AS $$
        BEGIN
            NEW.fecha := current_timestamp;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        DROP TRIGGER IF EXISTS fechaVenta ON "Venta";
        
        -- TRIGGER 2
        CREATE TRIGGER fechaVenta
        BEFORE INSERT
        ON "Venta"
        FOR EACH ROW EXECUTE PROCEDURE agregarFecha();
    `);
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

app.listen(port, () => {
    console.log(`APP WORKING ON PORT ${port}`)
});