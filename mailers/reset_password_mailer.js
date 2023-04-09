// const nodeMailer = require('../config/nodemailer');
import nodeMailer from '../config/nodemailer';

// this is the another way of exporting a method
exports.resetPassword = (user)=>{
    let htmlString = nodeMailer.renderTemplate({user: user}, '/users/password_reset.ejs');
    console.log('Inside resetPassword Mailer');

    nodeMailer.transporter.sendMail(
        {
            from: 'yash.dcpd@gmail.com',
            to: user.email,
            subject: "Reset Your Password",
            html: htmlString
        },
        (err, info) =>{
            if(err){
                console.log('Error in sending mail', err);
                return;
            }

            return;
        }
    );
}