const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const path = require("path");
const { Animal, Category } = require("../models");

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

router.get("/basket", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render("shoppingBasket");
});

  module.exports = router;