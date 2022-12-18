const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model{}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'category',
    }
);

module.exports = Category;