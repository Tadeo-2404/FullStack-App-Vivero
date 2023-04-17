import { Sequelize, DataTypes, Model } from 'sequelize';

// Clase cliente que extiende un modelo
class Administrador extends Model {
    static init(sequelize) {
        return super.init({
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
            tableName: 'Administrador', // Nombre de la tabla
            modelName: 'Administrador', // Nombre del modelo
        });
    }

    static associate(models) {
        Administrador.hasMany(models.Productos, {foreignKey: 'id'}),
        Administrador.hasMany(models.Sucursal, {foreignKey: 'id'})
    }
}

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Administrador.sync({ alter: true });

export default Administrador;