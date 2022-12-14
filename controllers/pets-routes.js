const { Module , DataTypes } = require("sequelize");
const router = require('express').Router();
const path = require('path');

// Get homepage 
router.get('/', async (req, res) => {
    // console.log(req)
    // console.log(res)
    res.render('index');
  });

  module.exports = router;