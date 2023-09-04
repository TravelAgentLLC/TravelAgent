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
router.get('/:id', getUser, (req, res) => {
  res.json(res.locals.user);
});

//creating one user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating one user
router.patch('/:id', getUser, async (req, res) => {
    const userObj = res.locals.user
    for (const key in userObj){
        if (req.body[key] != null){
            userObj[key] = req.body[key];
        }
    }

    try {
        const updatedUser = await userObj.save();
        res.json(updatedUser);
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
});

//deleting one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(res.locals.user.id)
    res.json({ message: 'Deleted User' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


//middleware functions
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.locals.user = user;
    if (user == null) {
      return res.status(400).json({ message: 'cannot find user' });
    }
    return next();
  } catch (e) {
    return next({ message: e.message });
  }
}

module.exports = router;
