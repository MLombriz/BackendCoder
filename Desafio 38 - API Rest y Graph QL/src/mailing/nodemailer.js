const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jeffrey.hettinger40@ethereal.email',
        pass: 'sJr1ezThuP2zU5EqZ1'
    }
});


const mailOptions = {
    from: "Servidor node",
    to: "jeffrey.hettinger40@ethereal.email",
    subject: "Ha iniciado sesión",
    html: "<h1>Sign in</h1>",
    atachments: [{
        path: 'nodemailer.png'
    }]
}

const mailOptionsLogOut = {
    from: "Servidor node",
    to: "jeffrey.hettinger40@ethereal.email",
    subject: "Ha cerrado sesión",
    html: "<h1>Log out sucess</h1>"
}

module.exports = { transporter, mailOptions, mailOptionsLogOut }