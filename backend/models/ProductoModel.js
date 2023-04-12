import { Sequelize, DataTypes, Model } from 'sequelize';

//clase producto que extiende un modelo
class Producto extends Model {
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
            tableName: 'Producto', //nombre de la tabla
            modelName: 'Producto', //nombre del modelo
        });
    }

    //cada producto pertenece a un admin quien lo crea
    static associate(models) {
        Producto.belongsTo(models.Administrador, {foreignKey: 'id'})
    }
}

export default Producto