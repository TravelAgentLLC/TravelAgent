const express = require('express');
const router = express.Router();
const User = require('../models/user');

//getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one user
router.get('/:id', (req, res) => {});

//creating one user
router.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = new User({
        username,
        password
    })

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//updating one user
router.patch('/:id', (req, res) => {});

//deleting one user
router.delete('/:id', (req, res) => {});

module.exports = router;
