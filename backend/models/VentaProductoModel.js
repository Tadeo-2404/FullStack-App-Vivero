import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';
import Venta from './VentaModel.js';
import Producto from './ProductoModel.js';

/*
id: atributo identificador del registro
venta_id: atributo identificador de la venta a la que pertenece
producto_id: atributo identificador del producto al que se relaciona
cantidad: numero total de productos vendidos de ese tipo
subtotal: cantidad total a pagar por esos productos
*/

class VentaProducto extends Model {}

VentaProducto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type:  DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'venta_producto', // Nombre de la tabla
  modelName: 'VentaProducto', // Nombre del modelo,
  timestamps: false
});

//! BUSCAR SOLUCIÓN: Estas asociaciones agregan atributos a la tabla, no sé como se usa
// Agregar asociaciones entre los modelos
// Producto.belongsToMany(Venta, { through: VentaProducto });
// Venta.belongsToMany(Producto, { through: VentaProducto });

//sincronizar tabla 
await VentaProducto.sync({force: true}).then(() => {
    console.log('Tabla venta_producto creada');
}).catch(error => {
    console.error('Error creando la tabla venta_producto:', error);
});

export default VentaProducto;