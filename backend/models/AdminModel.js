import { Sequelize, DataTypes, Model } from 'sequelize';

//clase cliente que extiende un modelo
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
            tableName: 'Administrador', //nombre de la tabla
            modelName: 'Administrador', //nombre del modelo
        });
    }

    static associate(models) {
        Administrador.hasMany(models.Productos, {foreignKey: 'id'}),
        Administrador.hasMany(models.Sucursal, {foreignKey: 'id'})
    }
}

export default Administrador