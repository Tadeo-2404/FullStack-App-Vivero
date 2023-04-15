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
    tableName: 'sustrato', //nombre de la tabla
    modelName: 'Sustrato', //nombre del modelo,
    timestamps: false,
});

export default Sustrato;
