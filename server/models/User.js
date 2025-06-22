// @ts-nocheck
import { db } from '../database/connection.js'
import bcrypt from 'bcryptjs'

export class User {
  static async create(userData) {
    const { email, password, first_name, last_name } = userData

    // Hash the password
    const saltRounds = 12
    const password_hash = await bcrypt.hash(password, saltRounds)

    const [newUser] = await db('users')
      .insert({
        email,
        password_hash,
        first_name,
        last_name,
      })
      .returning(['id', 'email', 'first_name', 'last_name', 'is_admin', 'is_approved', 'created_at'])

    return newUser
  }

  static async findByEmail(email) {
    return db('users').where({ email }).first()
  }

  static async findById(id) {
    return db('users')
      .where({ id })
      .select(['id', 'email', 'first_name', 'last_name', 'is_admin', 'is_approved', 'created_at'])
      .first()
  }

  static async update(id, updates) {
    // If password is being updated, hash it
    if (updates.password) {
      const saltRounds = 12
      updates.password_hash = await bcrypt.hash(updates.password, saltRounds)
      delete updates.password
    }

    const [user] = await db('users')
      .where({ id })
      .update({
        ...updates,
        updated_at: db.fn.now(),
      })
      .returning(['id', 'email', 'first_name', 'last_name', 'is_admin', 'is_approved', 'created_at'])

    return user
  }

  static async delete(id) {
    return db('users').where({ id }).del()
  }

  static async verifyPassword(user, password) {
    return bcrypt.compare(password, user.password_hash)
  }
}
