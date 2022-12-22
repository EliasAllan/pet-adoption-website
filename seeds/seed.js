const sequelize = require('../config/connection');
const {User, Cart , Category , Animal  } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const animalData = require('./animalData.json');
const cartData = require('./cartData.json');

const seedDatabase = async (cb) => {
    await sequelize.sync({force: true});
    
    const category = await Category.bulkCreate(categoryData, {
        individualHooks: true,
        returning: true,
    });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const cart of cartData) {
      await Cart.create({
        ...cart,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    
    const animal = await Animal.bulkCreate(animalData, {
        individualHooks: true,
        returning: true,
    });

    
    




    // process.exit(0);
    cb();
};

// seedDatabase();
module.exports = seedDatabase;