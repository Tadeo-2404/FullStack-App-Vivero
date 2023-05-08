import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

class Venta extends Model {}

Venta.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'Venta',
    modelName: 'Venta',
    timestamps: false,
});

export default Venta;