import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class ProveedorProducto extends Model { }

ProveedorProducto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  proveedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'venta',
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'proveedor_producto', // Nombre de la tabla
  modelName: 'ProveedorProducto', // Nombre del modelo,
  timestamps: false
});

//sincronizar tabla 
await ProveedorProducto.sync({ force: true }).then(() => {
  console.log('Tabla proveedor_producto creada');
}).catch(error => {
  console.error('Error creando la tabla proveedor_producto:', error);
});

export default ProveedorProducto;