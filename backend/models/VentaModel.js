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
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'venta',
    modelName: 'Venta',
    timestamps: false,
});

await Venta.sync({ alter: true });

export default Venta;