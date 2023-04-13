import { Sequelize, DataTypes, Model } from 'sequelize';

//clase sustrato que extiende un modelo
class Sustrato extends Model {
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
            tableName: 'Sustrato', //nombre de la tabla
            modelName: 'Sustrato', //nombre del modelo
        });
    }

    static associate(models) {
        Sustrato.belongsTo(models.Proveedor, {foreignKey: 'id'}); //sustrato perteence a un proveedor quien lo surte
        Sustrato.belongsTo(models.Cliente, {foreignKey: 'id'}); //sustrato pertenece a un cliente quien lo compra
    }
}

export default Sustrato