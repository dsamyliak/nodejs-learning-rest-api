const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465(need secure trafic), 2255
    secure: true,
    auth: {
        user: "dsamyliak@meta.ua",
        pass: META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const mail = {
    to: "arestovich@gmail.com",
    from: "dsamyliak@meta.ua",
    subject: "Skilky bude dniv viyna?",
    html: "2-3 weeks",
}

transport.sendMail(mail)
    .then(() => console.log("Email send success"))
    .catch(error => console.log(error.message));