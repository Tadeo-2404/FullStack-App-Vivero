import { Sequelize, DataTypes, Model } from 'sequelize';

// Clase empleado que extiende un modelo
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
            tableName: 'Empleado', // Nombre de la tabla
            modelName: 'Empleado', // Nombre del modelo
        });
    }

    // Se definen los foreing key de la entidad Empleado
    static associate(models) {
        Empleado.belongsTo(models.Sucursal, {foreignKey: 'id'}); // Empleado pertenece a una sucursal
        Empleado.hasMany(models.Cliente,  {foreignKey: 'id'}); // Empleado tiene uno o muchos clientes
    }
}

/*
    Si la tabla en postgres no existe, la crea, y si existe, no hace nada
    alter: true -> Si la tabla en postgres es diferente a este modelo, se sincroniza cambiando las columnas, tipos de datos, etc
*/
await Empleado.sync({ alter: true });

export default Empleado;