const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongoose').Types;
const Habit = require('./models/habit');

const app = express();
const port = process.env.PORT || 3000;

// Configure the database connection
mongoose.connect('mongodb+srv://habit_tracker:database@cluster0.mwuvbb0.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Default user ID for testing purposes
const defaultUserId = new ObjectId('123456'.padStart(24, '0'));

// Create and update habits
app.post('/habits', async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const habit = new Habit({
      name,
      description,
      status,
      userId: defaultUserId,
    });
    await habit.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Home page route
app.get('/', async (req, res) => {
  try {
    const habits = await Habit.find({ userId: defaultUserId });
    res.render('home', { habits });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Habit detail page route
app.get('/habit/:habitId', async (req, res) => {
  const habitId = req.params.habitId;
  try {
    const habit = await Habit.findById(habitId);
    res.render('habitdetail', { habit });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Weekly progress page route (placeholder)
app.get('/habit/:habitId/weekly', (req, res) => {
  // Retrieve weekly progress data for the habit (you need to implement this)
  const habitId = req.params.habitId;
  // Sample data for demonstration
  const weeklyProgress = [
    { week: 1, completed: 5 },
    { week: 2, completed: 7 },
    // Add more data as needed
  ];
  const habit = { name: 'Sample Habit' }; // Replace with actual habit data
  res.render('weekly', { habit, weeklyProgress });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
