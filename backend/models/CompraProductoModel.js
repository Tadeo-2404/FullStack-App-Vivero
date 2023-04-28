import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.js';

/**
 COMPRA_PRODUCTO
 Este Modelo representa un producto perteneciente a una Compra, una Compra 
 se realiza a un Proveedor, donde se adquieren una X cantidad de Proveedor_Producto
 cada Proveedor_Producto sera representado por un registro CompraProducto.
 id -> identificador del registro
 id_compra -> identificador de la compra a la que pertenece el registro
 id_proveedor -> identificador del proveedor a quien se le realiza la compra
 id_proveedorProducto -> identificador del producto adquirido del Proveedor
 cantidad -> cantidad adquirida de un registro
 total -> total $ de la compra
 */

class CompraProducto extends Model { }

CompraProducto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Compra',
            key: 'id'
        }
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Proveedor',
            key: 'id'
        }
    },
    id_proveedorProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ProveedorProducto',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'CompraProducto', // Nombre de la tabla
    modelName: 'CompraProducto', // Nombre del modelo,
    timestamps: false
});

export default CompraProducto;