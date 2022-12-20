const router = require("express").Router();
const { Animal } = require("../../models");
const withApiAuth = require("../../utils/apiAuth");

// create cart item by adding a record in user table
router.post("/basket", withApiAuth, async (req, res) => {
  try {
    const newAnimal = await Animal.findByPk({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAnimal);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/test", (req,res) => res.send("success"))

module.exports = router;
