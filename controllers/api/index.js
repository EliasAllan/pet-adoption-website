const router = require('express').Router();

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