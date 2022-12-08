const notificationModel = require("../models/notificationModel")

module.exports = {
    setNotification:(userId,recipients,type,content,viewId)=>{
        return new Promise((resolve, reject) => {
            new notificationModel({userId,recipients,type,content,viewId}).save()
            .then(data=>resolve(data))
            .catch(error=>reject(error))
        })
    }
}