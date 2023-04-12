import { Sequelize, DataTypes, Model } from 'sequelize';

//clase empleado que extiende un modelo
class Empleado extends Model {
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
            tableName: 'Empleado', //nombre de la tabla
            modelName: 'Empleado', //nombre del modelo
        });
    }

    //se definen los foreing key de la entidad Empleado
    static associate(models) {
        Empleado.belongsTo(models.Sucursal, {foreignKey: 'id'}); //empleado pertenece a una sucursal
        Empleado.hasMany(models.Cliente,  {foreignKey: 'id'}); //empleado tiene uno o muchos clientes
    }
}

export default Empleado