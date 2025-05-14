const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  assignRole,
} = require('../controllers/userController');

const { protect, authorizeRoles, ROLES } = require('../midddlewares/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected: only management can assign roles
router.post('/assign-role', protect, authorizeRoles(ROLES.MANAGEMENT), assignRole);

module.exports = router;


