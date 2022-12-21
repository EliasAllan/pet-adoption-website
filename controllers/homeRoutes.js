const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const path = require("path");
const { Animal, Category, Cart, User } = require("../models");

// Get homepage
router.get("/", async (req, res) => {
  // console.log(req)
  // console.log(res)
  let animals = await Animal.findAll();
  console.log(animals);
  res.render("homepage", { 
    animals: animals,
    logged_in: req.session.logged_in 
  });
  
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

 router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/basket", async (req, res) => {
  try {
  // Get all projects and JOIN with user data
  const cartData = await Cart.findAll({
    include:[
      // {
      //   model:Animal,
      //   attributes:['name','breed','age'],
      // },
    ],
  });
 // Serialize data so the template can read it
  const carts = cartData.map((cart) => cart.get({ plain: true }));
  
  // making the data readable
  console.log(JSON.stringify(
    {
      carts, 
      logged_in: req.session.logged_in 
    }, 
    null, 2));
  // If the user is already logged in, redirect the request to another route
  res.render('shoppingBasket', { 
    carts, 
    logged_in: req.session.logged_in 
  });
} catch (err) {
  res.status(500).json(err);
}
});

  module.exports = router;