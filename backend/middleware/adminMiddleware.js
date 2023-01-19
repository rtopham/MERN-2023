const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protectAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-hashed_password')
    if (!user.isAdmin) {
      res.status(401)
      throw new Error('Admin Only')
    }
  } catch (err) {
    res.status(401)
    throw new Error('Amin Only')
  }

  next()
})

module.exports = { protectAdmin }
