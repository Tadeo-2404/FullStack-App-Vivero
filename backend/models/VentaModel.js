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

//sincronizar tabla
// primero la borra para introducir los datos desde cero 
await Venta.sync({force: true}).then(() => {
    console.log('Tabla venta creada');
  }).catch(error => {
    console.error('Error creando la tabla venta:', error);
  });

//! BUSCAR SOLUCIÓN: no deja que el autoIncrement funcione correctamente
// Crear registros
// await sequelize.query(`INSERT INTO venta (id, fecha, total) VALUES 
// (1, '2023-04-23', 2366), 
// (2, '2023-04-23', 945), 
// (3, '2023-04-23', 5400), 
// (4, '2023-04-23', 2000), 
// (5, '2023-04-23', 1220)`
// ).then(() => {
//     console.log('Registros insertados');
// }).catch(error => {
//     console.log(error)
// });

export default Venta;