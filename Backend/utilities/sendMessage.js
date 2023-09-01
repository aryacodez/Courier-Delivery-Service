const sid = process.env.SID
const token = process.env.TOKEN

const client = require('twilio')(sid,token);

const sendSMS = (to)=>{
    client.messages.create({
        body:'Thank you for placing order with DelFe. Your order will be delivered soon!!!',
        to:`+91${to}`,
        from:'+12344234645'
    }).then(res=>console.log(res))
    .catch(err=>console.error(err))
}

module.exports = sendSMS;