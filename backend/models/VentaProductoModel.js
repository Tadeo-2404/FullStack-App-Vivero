import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

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
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Venta',
      key: 'id'
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Producto',
      key: 'id'
    }
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
  tableName: 'VentaProducto', // Nombre de la tabla
  modelName: 'VentaProducto', // Nombre del modelo,
  timestamps: false
});

export default VentaProducto;