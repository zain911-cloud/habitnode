const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
