const Animal = require('./Animal');
const Category = require('./Category');
const User = require('./User')
const Cart = require('./Cart')

Category.hasMany(Animal, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Animal.belongsTo(Category, {
  foreignKey: 'category_id'
});

// work in progress below, subject to change
Cart.hasMany(Animal, {
  foreignKey: 'animal_id',
  onDelete: 'CASCADE'
});

Animal.belongsTo(Cart, {
  foreignKey: 'animal_id'
});
// work in progress above, subject to change
module.exports = { Animal, Category, User , Cart};