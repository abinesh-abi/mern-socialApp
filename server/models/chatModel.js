
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    members: {
      type: [{type:mongoose.Types.ObjectId,ref:'user'}],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", schema);