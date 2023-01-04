

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    postId: {type: mongoose.Types.ObjectId, ref: 'posts'},
    message:String,
    // userId: {type: mongoose.Types.ObjectId, ref: 'users'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("report", schema);