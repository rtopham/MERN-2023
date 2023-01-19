const jwt = require('jsonwebtoken')

const getResetToken = (userId) => {
  const payload = {
    user: {
      id: userId
    }
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })
  return token
}

const getAccountAccessAttemptedMessage = (email) => {
  const appName = process.env.APP_NAME
  let message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `${appName} Account Access Attempted`,
    text: `You (or someone else) entered this email address when trying to change the password of a ${appName} account. \
        However, this email address is not in our database of registered users and therefore the attempted password change has failed.\
        If you are a registered ${appName} user and your were expecting this email, please try again using the email address you gave when you signed up.\
        If you are not a registered user, please ignore this email.\
        Kind Regards\
        ${appName} Support`,
    html: `<p>You (or someone else) entered this email address when trying to change the password of a ${appName} account on our site.\
        </p>However, this email address is not in our database of registered users and therefore the attempted password change has failed.</p>\
        <p>If you are a registered ${appName} user and you were expecting this email, please try again using the email address you gave when you signed up.</p>\
        <p>If you are not a registered user, please ignore this email.</p>\
        <p>Kind regards</p>\
        <p>${appName} Support</p>`
  }
  return message
}

const getPasswordResetMessage = (email, resetToken) => {
  const appName = process.env.APP_NAME
  const appUrlBase = process.env.BASE_URL
  let message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Please Reset your ${appName} Password`,
    text: `We sent this message because you requested that your ${appName} password be reset. 
        To get back into your ${appName} account you will need to create a new password.
        Please follow these instructions:
        1. Click the link below to open a new and secure browser window
        2. Enter the requested information and follow the instructions to reset your password.
        Reset your password now: 
        ${appUrlBase}/reset-password/${resetToken}`,
    html: `<p> We sent this message because you requested that your ${appName} password be reset.</p> 
        <p>To get back into your ${appName} account you will need to create a new password.</p>
        <p>Please follow these instructions:</p>
        <p>1. Click the link below to open a new and secure browser window</p>
        <p>2. Enter the requested information and follow the instructions to reset your password. This link will be valid for one hour.</p>
        <p>Reset your password now:</p>
        <p><a href="${appUrlBase}/reset-password/${resetToken}">${appUrlBase}/reset-password/${resetToken}</a></p>`
  }
  return message
}

module.exports = {
  getResetToken,
  getAccountAccessAttemptedMessage,
  getPasswordResetMessage
}
