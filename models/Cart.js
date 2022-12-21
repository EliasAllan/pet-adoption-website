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
        animal_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'animal',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
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