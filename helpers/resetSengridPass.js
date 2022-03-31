const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.APY_KEY_EMAIL;
sgMail.setApiKey(API_KEY);

const resetPasswordGrid = async (datos) => {
    const { firstName, lastName, email, token } = datos;
    const msg = {
        to: email,
        from: 'userProjectTest@gmail.com',
        subject: `${firstName}, Reset Password Request`,
        text: 'Confirm your account',
        html: `
            <p>Hi ${firstName}, follow this link to change your password </p>

            <a href="${process.env.FRONT_URL}/forgot-password/${token}">Change your password</a>

            <p>Did not requested, please reported at: <span>userProjectTest@gmail.com</span> </p>
        `,
    }
    
    sgMail.send(msg)
        .then((response) => console.log(response.body, ' email sent'))
        .catch((err) => console.log(err.response))
}

module.exports = resetPasswordGrid;