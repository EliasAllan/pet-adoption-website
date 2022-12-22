const Cart = require('./Cart');
const User = require('./User');
const Category = require('./Category');
const Animal = require('./Animal');
// const AnimalCart = require('./AnimalCart');

User.hasOne(Cart, {
  foreignKey:'user_id',
  onDelete: 'CASCADE'
});

Cart.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Animal, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Animal.belongsTo(Category, {
  foreignKey: 'category_id'
});

Cart.hasMany(Animal, {
  foreignKey: 'cart_id'
});

Animal.belongsTo(Cart, {
  foreignKey: 'cart_id'
});
// work in progress below, subject to change


// work in progress above, subject to change
module.exports = {  Cart , User , Category, Animal };