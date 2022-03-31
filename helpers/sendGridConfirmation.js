const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.APY_KEY_EMAIL;
sgMail.setApiKey(API_KEY);

const sendConfirmation = async (datos) => {
    const { firstName, lastName, email, token } = datos;
    const msg = {
        to: email,
        from: 'userProjectTest@gmail.com',
        subject: `${firstName}, Confirm your Account`,
        text: 'Confirm your account',
        html: `
            <p>Hi, ${firstName}, just one step to verify your account </p>

            <p>Just click the link below</p>

            <a href="${process.env.FRONT_URL}/confirm/account/${token}">Verify your account</a>

            <p>Something weird, reported at: <span>userProjectTest@gmail.com</span></p>
        `,
    }
    
    sgMail.send(msg)
        .then((response) => console.log(response.body, 'Email sent '))
        .catch((err) => console.log(err.response))
}

module.exports = sendConfirmation;