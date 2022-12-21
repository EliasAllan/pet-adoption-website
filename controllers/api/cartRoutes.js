const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const { Animal, Cart } = require("../../models");
const withApiAuth = require("../../utils/apiAuth");
// api/users/basket
// Use withAuth middleware to prevent access to route
router.post("/basket", withApiAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const cartData = await Cart.create({
      ...req.body,
      user_id: req.session.user_id,
      include: [{ model: Animal }],
    });

    // const user = userData.get({ plain: true });

    // res.render("shoppingBasket", {
    //   ...user,
    //   logged_in: true,
    // });
    res.status(200).json(cartData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/test", (req, res) => res.send("success"));

module.exports = router;
