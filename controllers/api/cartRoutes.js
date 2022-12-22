const { Model, DataTypes } = require("sequelize");
const router = require("express").Router();
const { Animal, Cart } = require("../../models");
const withApiAuth = require("../../utils/apiAuth");
// api/users/
// Use withAuth middleware to prevent access to route




router.post("/basket", withApiAuth, async (req, res) => {
  try {
    const animalId = req.body.id;
    let savedCartId = req.session.cart_id;
    const userId = req.session.user_id;
    console.log({animalId, savedCartId, userId});
    let cartData;
    if(savedCartId === undefined){
       cartData = await Cart.create({
        user_id: userId,
      });
      cartData = cartData.get({plain:true});
      savedCartId = cartData.id;
      await Animal.update({cart_id: savedCartId}, {where: {id: animalId}});
    }else{
      const result = await Animal.update({cart_id: savedCartId}, {where: {id: animalId}});
      cartData = await Cart.findAll({
        where: {id:savedCartId}
      });
      cartData = cartData.get({plain:true});
      savedCartId = cartData.id;
    }

    req.session.save(()=> {
      req.session.cart_id = savedCartId;
      res.status(200).json(cartData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withApiAuth, async (req, res) => {
  try {
    const animalData = await Animal.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!animalData) {
      res.status(404).json({ message: 'No animal found with this id!' });
      return;
    }

    res.status(200).json(animalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/test", (req, res) => res.send("success"));

module.exports = router;
