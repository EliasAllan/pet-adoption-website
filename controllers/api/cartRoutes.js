const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const { Animal, Cart } = require("../../models");
const withApiAuth = require("../../utils/apiAuth");
// api/users/
// Use withAuth middleware to prevent access to route
router.post("/basket", withApiAuth, async (req, res) => {
  try {
    const animalId = req.body.animal_id;
    let savedCartId = req.session.cart_id;
    const userId = req.session.user_id;
    console.log({ animalId, savedCartId, userId });
    let cartData;
    if (savedCartId === 0) {
      cartData = await Cart.create({
        user_id: userId,
      });
      cartData = cartData.get({ plain: true });
      savedCartId = cartData.id;
      await Animal.update(
        { where: { id: animalId } },
        { cart_id: savedCartId }
      );
    } else {
      const result = await Animal.update(
        { where: { id: animalId } },
        { cart_id: savedCartId }
      );
      cartData = await Cart.findAll({
        where: { id: savedCartId },
      });
      cartData = cartData.get({ plain: true });
      savedCartId = cartData.id;
    }
    // Find the logged in user based on the session ID
    // const cartData = await Cart.create({
    //   ...req.body,
    //   user_id: req.session.user_id,
    //   include: [{ model: Animal }],
    // });

    req.session.save(() => {
      req.session.cart_id = savedCartId;
      res.status(200).json(cartData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withApiAuth, async (req, res) => {
  try {
    const animalData = await Animal.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!animalData) {
      res.status(404).json({ message: "No animal found with this id!" });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/test", (req, res) => res.send("success"));

module.exports = router;
