const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const path = require("path");
const { Animal, Category, Cart, User } = require("../models");
const withAuth = require('../utils/auth');

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

router.get("/basket", withAuth, async (req, res) => {
  try {
  // Get all projects and JOIN with user data
  const cartData = await Cart.findByPk(req.session.user_id,{
    attributes: { exclude: ['password'] },
    include: [{ model: Animal }],
  });
 // Serialize data so the template can read it
  // const carts = cartData.map((cart) => cart.get({ plain: true }));
  const cart = cartData.get({ plain: true });
  // making the data readable
  // console.log(JSON.stringify(
  //   {
  //     carts, 
  //     logged_in: req.session.logged_in 
  //   }, 
  //   null, 2));
console.log(cart)
// console.log(cartData)
  // If the user is already logged in, redirect the request to another route
  res.render('shoppingBasket', { 
    ...cart, 
    logged_in: true
  });
} catch (err) {
  res.status(500).json(err);
}
});

  module.exports = router;