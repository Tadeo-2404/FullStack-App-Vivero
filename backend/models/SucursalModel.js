import { Sequelize, DataTypes, Model } from 'sequelize';

//clase sucursal que extiende un modelo
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
            tableName: 'Sucursal', //nombre de la tabla
            modelName: 'Sucursal', //nombre del modelo
        });
    }

    static associate(models) {
        Sucursal.hasOne(models.Administrador, {foreignKey: 'id'}); //sucursal tiene un administrador
        Sucursal.hasMany(models.Empleado, {foreignKey: 'id'}); //sucursal tiene muchos empleados
    }
}

export default Sucursal