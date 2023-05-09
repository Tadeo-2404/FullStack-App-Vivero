import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Producto extends Model {}

Producto.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_proveedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'Proveedor',
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
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_venta: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precio_compra: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'Producto', // Nombre de la tabla
    modelName: 'Producto', // Nombre del modelo,
    timestamps: false,
});

export default Producto;