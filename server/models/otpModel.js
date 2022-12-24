
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email:String,
    otp:Number,
    details:Object,
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expires : 60 * 5}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("otp", schema);