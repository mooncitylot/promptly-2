// @ts-nocheck
import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { User } from '../models/User.js'

const router = express.Router()

// Register new user
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('first_name').optional().trim(),
    body('last_name').optional().trim(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password, first_name, last_name } = req.body

      // Check if user already exists
      const existingUser = await User.findByEmail(email)
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' })
      }

      // Create new user
      const newUser = await User.create({
        email,
        password,
        first_name,
        last_name,
      })

      // Generate JWT token
      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })

      res.status(201).json({
        message: 'User created successfully',
        user: newUser,
        token,
      })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Login user
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').notEmpty()], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user by email
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(user, password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_admin: user.is_admin,
      is_approved: user.is_approved,
      created_at: user.created_at,
    }

    res.json({
      message: 'Login successful',
      user: userData,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Profile error:', error)
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
