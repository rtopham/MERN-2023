const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateProfile,
  getCurrentUser,
  getAllUsers,
  deleteUser,
  forgotPassword,
  validateResetToken,
  resetPassword
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')
const { protectAdmin } = require('../middleware/adminMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getCurrentUser)
router.put('/', protect, updateProfile)
router.put('/password-reset-request', forgotPassword)
router.put('/validate-reset-token', validateResetToken)
router.put('/reset-password', resetPassword)
router.get('/', protect, protectAdmin, getAllUsers)
router.delete('/:id', deleteUser)

module.exports = router
