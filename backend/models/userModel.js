const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pease add a name']
    },
    email: {
      type: String,
      required: [true, 'Pease add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Pease add a password']
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
