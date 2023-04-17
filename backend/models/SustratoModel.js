import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Sustrato extends Model {}

Sustrato.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    tableName: 'sustrato', // Nombre de la tabla
    modelName: 'Sustrato', // Nombre del modelo,
    timestamps: false,
});

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Sustrato.sync({ alter: true });

export default Sustrato;
