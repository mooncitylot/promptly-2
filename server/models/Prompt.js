// @ts-nocheck
import { db } from '../database/connection.js'

export class Prompt {
  static async create(promptData) {
    const { title, prompt } = promptData

    const [newPrompt] = await db('prompts')
      .insert({
        title,
        prompt,
      })
      .returning(['id', 'title', 'prompt', 'created_at', 'updated_at'])

    return newPrompt
  }

  static async findAll() {
    return db('prompts').select(['id', 'title', 'prompt', 'created_at', 'updated_at']).orderBy('updated_at', 'desc')
  }

  static async findById(id) {
    return db('prompts').where({ id }).select(['id', 'title', 'prompt', 'created_at', 'updated_at']).first()
  }

  static async update(id, updates) {
    const [prompt] = await db('prompts')
      .where({ id })
      .update({
        ...updates,
        updated_at: db.fn.now(),
      })
      .returning(['id', 'title', 'prompt', 'created_at', 'updated_at'])

    return prompt
  }

  static async delete(id) {
    return db('prompts').where({ id }).del()
  }

  static async search(searchTerm) {
    return db('prompts')
      .where('title', 'like', `%${searchTerm}%`)
      .orWhere('prompt', 'like', `%${searchTerm}%`)
      .select(['id', 'title', 'prompt', 'created_at', 'updated_at'])
      .orderBy('updated_at', 'desc')
  }
}
