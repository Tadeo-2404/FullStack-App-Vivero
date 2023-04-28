import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Producto extends Model {}

Producto.init({
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
    tableName: 'Producto', // Nombre de la tabla
    modelName: 'Producto', // Nombre del modelo,
    timestamps: false,
});

export default Producto;