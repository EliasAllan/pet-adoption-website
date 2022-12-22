const { Model, DataTypes } = require("sequelize");
const router = require('express').Router();
const { User, Animal, Cart} = require('../../models');


// create user by adding a record in user table
router.post('/signup', async (req, res) => {
    try {
      await User.create(req.body);
      res.status(200).render('login');
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // let the user login after authenticating else send an error
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ 
        where: { 
          email: req.body.email 
        },
        include: [
          {
            model:Cart,
          },
        ],
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        console.log(userData.id)
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.cart_id = userData.id;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;