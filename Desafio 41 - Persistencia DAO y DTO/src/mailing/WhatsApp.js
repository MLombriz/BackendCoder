const accountSid = 'AC6b54062c9a62ea310628712a32078ed8';
const authToken = 'ea57e18b47bca3dec4f3eb851ae74a2a';

const twilio = require('twilio')
const client = twilio(accountSid, authToken);

// const numero = process.argv[2]
// const mensaje = process.argv[3]
class TwilioCom {

    enviarMsg(mensaje) {
        client.messages.create({
            body: mensaje,
            mediaUrl: ['https://placekitten.com/g/200/300'],
            from: 'whatsapp:+1 360 515 3972',
            to: `whatsapp:+5491132024621`
        })
            .then(message => console.log(message.sid))
            .catch(console.log)
    }

}
module.exports = { TwilioCom }