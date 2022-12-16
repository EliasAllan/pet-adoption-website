//const { Module , DataTypes } = require("sequelize");
const router = require('express').Router();
const path = require('path');


// Get homepage 
router.get('/', async (req, res) => {
    // console.log(req)
    // console.log(res)
    res.render('homepage');
  });


  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });



  module.exports = router;