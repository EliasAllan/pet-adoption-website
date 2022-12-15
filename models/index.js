const Animal = require('./Animal');
const Category = require('./Category');

Category.hasMany(Animal, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Animal.belongsTo(Category, {
  foreignKey: 'category_id'
});

module.exports = { Animal, Category };