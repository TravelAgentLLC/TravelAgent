const express = require('express');
const router = express.Router();
// const Vacation = require('../models/vacations');

//getting all vacation data
router.get('/', async (req, res) => {
  try {
    const vacation = await Vacation.find();
    res.json(vacation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one user
router.get('/:id', getVacations, (req, res) => {
  res.json(res.locals.vacation);
});

//creating one user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const vacation = new Vacation({
    username,
    password,
  });

  try {
    const newVacation = await vacation.save();
    res.status(201).json(newVacation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating one user
router.patch('/:id', getVacations, async (req, res) => {
  const vacationObj = res.locals.vacation;
  // console.log(userObj)
  for (const key in vacationObj) {
    if (req.body[key] != null) {
      vacationObj[key] = req.body[key];
    }
  }

  try {
    const updatedVacation = await vacationObj.save();
    res.json(updatedVacation);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//deleting one user
router.delete('/:id', getVacations, async (req, res) => {
  try {
    await Vacation.findByIdAndDelete(res.locals.vacation.id);
    res.json({ message: 'Deleted User' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//middleware functions
async function getVacations(req, res, next) {
  try {
    const vacation = await Vacation.findById(req.params.id);
    res.locals.vacation = vacation;
    if (vacation == null) {
      return res.status(400).json({ message: 'cannot find user' });
    }
    return next();
  } catch (e) {
    return next({ message: e.message });
  }
}

module.exports = router;
