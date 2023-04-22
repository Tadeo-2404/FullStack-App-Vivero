import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Compra extends Model {}

Compra.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'proveedor',
          key: 'id'
        }
      },
      producto_proveedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'producto_proveedor',
          key: 'id'
        }
      },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'compra',
    modelName: 'Compra',
    timestamps: false,
});

//sincronizar tabla
// primero la borra para introducir los datos desde cero 
await Compra.sync({force: true}).then(() => {
    console.log('Tabla compra creada');
  }).catch(error => {
    console.error('Error creando la tabla compra:', error);
  });

export default Compra;