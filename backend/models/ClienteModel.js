import { Sequelize, DataTypes, Model } from 'sequelize';

//clase cliente que extiende un modelo
class Cliente extends Model {
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
            }
        }, {
            sequelize,
            tableName: 'Cliente', //nombre de la tabla
            modelName: 'Cliente', //nombre del modelo
        });
    }

    //se definen los foreing key de la entidad cliente
    /* en este caso la entidad cliente cuenta con muchos productos
    y con muchos sustratos */
    static associate(models) {
        Client.hasMany(models.Producto, {foreignKey: 'id'});
        Client.hasMany(models.Sustrato,  {foreignKey: 'id'});
    }
}

export default Cliente