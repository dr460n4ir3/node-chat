const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      // Add more user properties as needed
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

    const User = mongoose.model('User', userSchema);

    module.exports = User;