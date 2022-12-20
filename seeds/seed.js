const sequelize = require('../config/connection');
const { Animal, Category } = require('../models');

const categoryData = require('./categoryData.json');
const animalData = require('./animalData.json');

const seedDatabase = async (cb) => {
    await sequelize.sync({force: true});

    const category = await Category.bulkCreate(categoryData, {
        individualHooks: true,
        returning: true,
    });


    const animal = await Animal.bulkCreate(animalData, {
        individualHooks: true,
        returning: true,
    });

    // process.exit(0);
    cb();
};

// seedDatabase();
module.exports = seedDatabase;