const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const path = require("path");
const { Animal, Category, Cart, User } = require("../models");
const withAuth = require('../utils/auth');

// Get homepage
router.get("/", async (req, res) => {
  // console.log(req)
  // console.log(res)
  let animaldata = await Animal.findAll();
  const animals = animaldata.map((project) => project.get({plain: true}));
  console.log(animals);
  res.render("homepage", { 
    animals,
    logged_in: req.session.logged_in 
  });
  
});

router.get("/adopt", async (req, res) => {
  // console.log(req)
  // console.log(res)
  
  res.render("adopt", { 
    logged_in: req.session.logged_in 
  });
  
});

router.get('/basket', async (req, res) => {
  try {
    console.log(req.session.cart_id)
    // console.log(req.session.user_id)
    // console.log(user_id);
    const cart_id = req.session.cart_id;
    const user_id = req.session.user_id;
    // Get all projects and JOIN with user data
    const cartData = await Cart.findAll({
      where: {
        id: cart_id,
        user_id: user_id,
      },
      include: [
        {
          model: Animal,
        },
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const carts = cartData.map((project) => project.get({ plain: true }));
    console.log(JSON.stringify(carts, null, 2));
    // projects.forEach(project => {
    //   project.related_tags.forEach(tag => {
    //     // can access tag.name from here
    //     console.log(tag.name);
    //   });
    // });
    // console.log(JSON.stringify(projects, null, 2));
    // Pass serialized data and session flag into template
    res.render('shoppingBasket', { 
      carts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

// router.get("/basket", withAuth, async (req, res) => {
//   try {
//   // Get all projects and JOIN with user data
//   const cartData = await Cart.findByPk(req.session.user_id,{
//     attributes: { exclude: ['password'] },
//     include: [{ model: Animal }],
//   });
//  // Serialize data so the template can read it
//   // const carts = cartData.map((cart) => cart.get({ plain: true }));
//   const cart = cartData.get({ plain: true });

//   const id = cart.animal_id;
//   const selectedAnimal = await Animal.findByPk(id);
//   const aniData = selectedAnimal.get({plain: true});
//   // making the data readable
//   // console.log(JSON.stringify(
//   //   {
//   //     carts, 
//   //     logged_in: req.session.logged_in 
//   //   }, 
//   //   null, 2));
// console.log(aniData);
// // console.log(cartData)
//   res.render('shoppingBasket', { 
//     ...aniData, 
//     logged_in: true
//   });
// } catch (err) {
//   console.log(err);
//   res.status(500).json(err);
// }
// });

  module.exports = router;