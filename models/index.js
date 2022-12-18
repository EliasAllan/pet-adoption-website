const Animal = require('./Animal');
const Category = require('./Category');
const User = require('./User');
const Cart = require('./Cart');
const AnimalCart = require('./AnimalCart');

Category.hasMany(Animal, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Animal.belongsTo(Category, {
  foreignKey: 'category_id'
});

// work in progress below, subject to change
Cart.belongsToMany(Animal, {
  through: {
    model: AnimalCart
  }
});

Animal.belongsToMany(Cart, {
  through: {
    model: AnimalCart
  }
});
// work in progress above, subject to change
module.exports = { Animal, AnimalCart, Category, User , Cart};