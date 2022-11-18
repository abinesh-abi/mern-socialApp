const userModel = require("../models/userModel");

module.exports = {
  getUserByUserEmail: (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({email})
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
};
