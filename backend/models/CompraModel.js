import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Compra extends Model {}

Compra.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Proveedor',
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
    tableName: 'Compra',
    modelName: 'Compra',
    timestamps: false,
});

export default Compra;