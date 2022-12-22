const router = require('express').Router();
const { Animal } = require('../../models');
const withAuth = require('../../utils/auth');

// create cart item by adding a record in user table
router.post('/', withAuth, async (req, res) => {
    try {
      const newAnimal = await Animal.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newAnimal);
    } catch (err) {
      res.status(400).json(err);
    }
  });