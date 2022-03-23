const nodemailer = require('nodemailer');

const emailResetPassword = async (datos) => {

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
        subject: "Restaurant - Admin Reset your password",
        text: "Verify you account",
        html: `
            <p>Hi ${firstName}, follow this link to change your password </p>

            <a href="${process.env.FRONT_URL}/forgot-password/${token}">Change your password</a>

            <p>It is not you? Report this email as scam</p>
        `,
    })
}

module.exports = emailResetPassword;