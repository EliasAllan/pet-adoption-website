const router = require('express').Router();
const seedDatabase = require('../../seeds/seed');
const userRoutes = require('./userRoutes');
const cartRoutes = require('./cartRoutes');

router.use('/users', userRoutes);
router.use('/users', cartRoutes);

router.post('/seedDatabase', (req, res) => {
    seedDatabase(function(){
      res.json({
        message: "completed seed"
      })
    });
  });

module.exports = router;