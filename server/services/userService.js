const userModel = require("../models/userModel");

module.exports = {
  saveUser: (data) => {
    return new Promise((resolve, reject) => {
      new userModel({...data}).save()
      .then(val=>resolve(val))
      .catch(error=>reject(error))
    });
  },
  getUserByUserEmail: (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({email})
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
  getUserByUserUserName: (username) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({username})
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
  getUserByUserId: (_id) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({_id})
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
  useridAndEmailExists:(id,email)=>{
    return new Promise((resolve, reject) => {
      userModel.findOne({ _id:{$ne:id},email})
      .then((data)=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  updateUser:(_id,values)=>{
    return new Promise((resolve, reject) => {
      userModel.updateOne({_id},{$set:values})
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  },
  editPassword:(_id,password)=>{
    return new Promise((resolve, reject) => {
      userModel.updateOne({_id},{$set:{password}})
      .then(data=>resolve(data))
      .catch(error=>reject(error))
    })
  }
};
