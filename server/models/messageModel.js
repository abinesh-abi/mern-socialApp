const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    ChatId: {
      type: mongoose.Types.ObjectId,
      ref: 'chats'
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", schema);
