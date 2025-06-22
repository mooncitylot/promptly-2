// @ts-nocheck
import express from 'express'
import { body, validationResult } from 'express-validator'
import { Prompt } from '../models/Prompt.js'

const router = express.Router()

// Get all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.findAll()
    res.json({ prompts })
  } catch (error) {
    console.error('Get prompts error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get prompt by ID
router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id)
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' })
    }
    res.json({ prompt })
  } catch (error) {
    console.error('Get prompt error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Create new prompt
router.post(
  '/',
  [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('prompt').trim().isLength({ min: 1 }).withMessage('Prompt content is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
      }

      const { title, prompt } = req.body
      const newPrompt = await Prompt.create({ title, prompt })

      res.status(201).json({ prompt: newPrompt })
    } catch (error) {
      console.error('Create prompt error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
)

// Update prompt
router.put(
  '/:id',
  [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('prompt').trim().isLength({ min: 1 }).withMessage('Prompt content is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
      }

      const { title, prompt } = req.body
      const updatedPrompt = await Prompt.update(req.params.id, { title, prompt })

      if (!updatedPrompt) {
        return res.status(404).json({ message: 'Prompt not found' })
      }

      res.json({ prompt: updatedPrompt })
    } catch (error) {
      console.error('Update prompt error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
)

// Delete prompt
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Prompt.delete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Prompt not found' })
    }

    res.json({ message: 'Prompt deleted successfully' })
  } catch (error) {
    console.error('Delete prompt error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Search prompts
router.get('/search/:term', async (req, res) => {
  try {
    const prompts = await Prompt.search(req.params.term)
    res.json({ prompts })
  } catch (error) {
    console.error('Search prompts error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
