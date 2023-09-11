const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

// Route to display a list of habits (home page)
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.render('home', { habits });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Route to view habit details
router.get('/:habitId', async (req, res) => {
  const habitId = req.params.habitId;
  try {
    const habit = await Habit.findById(habitId);
    res.render('habitDetail', { habit });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Add your other habit-related routes here

module.exports = router;
