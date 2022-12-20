const router = require('express').Router();
const seedDatabase = require('../../seeds/seed');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

router.post('/seedDatabase', (req, res) => {
    seedDatabase(function(){
      res.json({
        message: "completed seed"
      })
    });
  });

module.exports = router;