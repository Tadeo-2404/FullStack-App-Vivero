import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Proveedor extends Model {}

Proveedor.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'Proveedor', //nombre de la tabla
    modelName: 'Proveedor', //nombre del modelo,
    timestamps: false,
});

export default Proveedor;