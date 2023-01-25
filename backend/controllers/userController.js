const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const {
  getResetToken,
  getAccountAccessAttemptedMessage,
  getPasswordResetMessage
} = require('../utils/passwordReset')

// sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

// @desc    Register a new user
// @route   /api/users
// @access  public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  //Find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Could not register user')
  }
})

// @desc    Login a user
// @route   /api/users
// @access  public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  //Check User and Passwords Match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Update Profile of Logged In User
// @route   /api/users
// @access  private

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  //Find if user already exists
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User not found.')
  }

  if (password) {
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword
  }
  if (user) {
    const updatedProfile = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true
      }
    )

    res.status(200).json(updatedProfile)
  }
})

// @desc    Get Current User
// @route   /api/users/me
// @access  private

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '12h' })
}

// @desc    Get All Users
// @route   /api/users
// @access  public

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
})

// @desc    Delete User
// @route   DELETE /api/users/:userId
// @access  private

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const deletedUser = await user.remove()

  res.status(200).json(deletedUser)
})

// @desc    Forgot Password--Token Request
// @route   PUT /api/users/password-reset-request
// @access  public

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  // find user by email
  const user = await User.findOne({ email })
  let emailData
  if (!user) {
    emailData = getAccountAccessAttemptedMessage(email)
  } else {
    const resetToken = getResetToken(user._id)
    emailData = getPasswordResetMessage(email, resetToken)
  }

  // send email
  try {
    const data = await sgMail.send(emailData)
    res.status(202).json({ ok: true, msg: 'Email Sent' })
  } catch (err) {
    console.log(err)
    res.json({ ok: false, msg: 'Server Error' })
  }
})

// @desc    Validate Reset Token
// @route   PUT /api/users/validate-reset-token
// @access  public

const validateResetToken = asyncHandler(async (req, res) => {
  const { token } = req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json(decoded.user)
  } catch (err) {
    res.status(401)
    throw new Error('Invalid token')
  }
})

// @desc    Validate Reset Token
// @route   PUT /api/users/validate-reset-token
// @access  public

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body

  const userFields = {}
  if (password) {
    const salt = await bcrypt.genSalt(10)
    userFields.password = await bcrypt.hash(password, salt)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOneAndUpdate(
      { _id: decoded.user.id },
      { $set: userFields },
      { new: true }
    )
    res.status(200).json({ ok: true, msg: 'Password reset' })
  } catch (err) {
    res.status(401)
    throw new Error('Invalid token')
  }
})

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getCurrentUser,
  getAllUsers,
  deleteUser,
  forgotPassword,
  validateResetToken,
  resetPassword
}
