const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  const Message = mongoose.model('Message', messageSchema);

    module.exports = Message;