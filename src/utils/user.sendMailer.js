/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const nodemailer= require('nodemailer')
const dotenv=require('dotenv')
dotenv.config()

const transpoter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.PASS,
    },
});

async function sendEmail({to,subject,html}) {
    try {
        const data=await transpoter.sendMail({
            from:`'${process.env.USER_NAME}' <${process.env.USER_EMAIL}>`,
            to:to,
            subject:subject,
            html:html
        })
    return { success: true};
    } catch (error) {
        return { success: false};
    }
}

module.exports = sendEmail;