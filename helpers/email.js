const nodemailer = require('nodemailer');

const emailRegistro = async (datos) => {

    const { firstName, lastName, email, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });// Credenciales para nodemailer

    const info = await transport.sendMail({
        from: ' "Restaurante Admin" <useradmin@restaurant.com>',
        to: email,
        subject: "Restaurant - Admin Verify your account",
        text: "Verify you account",
        html: `
            <p>Hi, ${firstName}, just one step to verify your account </p>

            <p>Just click the link below</p>

            <a href="${process.env.FRONT_URL}/confirm/account/${token}">Verify your account</a>

            <p>Did not create the account, no worries, skip this email</p>
        `,
    })
}

module.exports = emailRegistro;

