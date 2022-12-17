//  Is this relationship many to many ? I figured since each 
//animal is unique and we don't have a stock of identical
//animals it would be a one-many relationship
//one cart can have multiple animals but one animal can't have
//multiple carts
// Please let me know if my logic is wrong, not sure i grasped the full 
//concept from class

const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/connection");

class AnimalCart extends Model{}

AnimalCart.init(
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
                key: 'id',
            }
        },
        cart_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cart',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'animalcart',
    }
);

module.exports = AnimalCart;