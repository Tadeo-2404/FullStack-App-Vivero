import { Sequelize, DataTypes, Model } from 'sequelize';

// Clase sucursal que extiende un modelo
class Sucursal extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            direccion: {
                type: DataTypes.TEXT('long'),
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hora_apertura: {
                type: DataTypes.TIME,
                allowNull: false
            },
            hora_cierre: {
                type: DataTypes.TIME,
                allowNull: false
            },
        }, {
            sequelize,
            tableName: 'Sucursal', // Nombre de la tabla
            modelName: 'Sucursal', // Nombre del modelo
        });
    }

    static associate(models) {
        Sucursal.hasOne(models.Administrador, {foreignKey: 'id'}); // Sucursal tiene un administrador
        Sucursal.hasMany(models.Empleado, {foreignKey: 'id'}); // Sucursal tiene muchos empleados
    }
}

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Sucursal.sync({ alter: true });

export default Sucursal;