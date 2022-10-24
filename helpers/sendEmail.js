const sgMail = require("@sendgrid/mail");
// require("dotenv").config(); - тут не потрібен, бо є в app.js

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const mail = { ...data, from: "dsamyliak@gmail.com" };
    await sgMail.send(mail);
    return true;
}

module.exports = sendEmail;