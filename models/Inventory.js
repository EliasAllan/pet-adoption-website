//  Unclear if we'll need an inventory since we're working with 
//each pet individually rather than having an inventory of
//multiple pets of the same kind

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventory extends Model{}

Inventory.init(
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
        category_id: {
            references: {
                model: 'category',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'inventory',
    }
);

module.exports = Inventory;