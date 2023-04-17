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
}, {
    sequelize,
    tableName: 'administrador', //nombre de la tabla
    modelName: 'Administrador', //nombre del modelo,
    timestamps: false,
});

export default Administrador;
