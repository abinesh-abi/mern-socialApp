const nodemailer = require('nodemailer');
const basicConfig = require('../config/basicConfig');
module.exports={
    sendEmail:(senderEmail,otp)=>{
     let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
        user:basicConfig.EMAIL_SEND_ID,
        pass:basicConfig.EMAIL_SEND_PASS,
        },
        tls: {
        ciphers: "SSLv3",
        },
        
    });

    var mailOptions={
        to: senderEmail,
       subject: "Otp for SocilaApp registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };

          transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        
        return true

    });
    }
}