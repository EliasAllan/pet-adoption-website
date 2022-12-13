const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cart extends Model{}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        animal_id: {
            references: {
                model: 'animal',
                key: 'id',
            }
        },
        customer_id: {
            references: {
                model: 'customer',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart',
    }
);

module.exports = Cart;