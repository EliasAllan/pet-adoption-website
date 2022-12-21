const Animal = require('./Animal');
const Category = require('./Category');
const User = require('./User');
const Cart = require('./Cart');
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

// work in progress below, subject to change


// work in progress above, subject to change
module.exports = { Animal, Category, User , Cart};