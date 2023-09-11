const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add other user fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
