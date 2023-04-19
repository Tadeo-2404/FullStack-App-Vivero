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
    tableName: 'proveedor', //nombre de la tabla
    modelName: 'Proveedor', //nombre del modelo,
    timestamps: false,
});

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Proveedor.sync({ alter: true });

export default Proveedor;