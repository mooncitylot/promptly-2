// @ts-nocheck
import knex from 'knex'
import knexConfig from './knexfile.js'

const environment = process.env.NODE_ENV || 'development'
const config = knexConfig[environment]

export const db = knex(config)

// Test the connection
export async function testConnection() {
  try {
    await db.raw('SELECT 1')
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

export default db
