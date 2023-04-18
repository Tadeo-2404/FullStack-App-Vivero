import { Sequelize, DataTypes, Model } from 'sequelize';

// Clase cliente que extiende un modelo
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
            tableName: 'Cliente', // Nombre de la tabla
            modelName: 'Cliente', // Nombre del modelo
        });
    }

    //Se definen los foreing key de la entidad cliente
    /* En este caso la entidad cliente cuenta con muchos productos
    y con muchos sustratos */
    static associate(models) {
        Cliente.hasMany(models.Producto, {foreignKey: 'id'});
        Cliente.hasMany(models.Sustrato,  {foreignKey: 'id'});
    }
}

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Cliente.sync({ alter: true });

export default Cliente;