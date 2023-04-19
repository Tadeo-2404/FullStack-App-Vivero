import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Administrador extends Model {}

Administrador.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'administrador', //nombre de la tabla
    modelName: 'Administrador', //nombre del modelo,
    timestamps: false,
});

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Administrador.sync({ alter: true });

export default Administrador;