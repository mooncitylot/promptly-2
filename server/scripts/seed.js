// @ts-nocheck
import knex from 'knex'
import knexConfig from '../database/knexfile.js'
import { config } from 'dotenv'

// Load environment variables
config()

const environment = process.env.NODE_ENV || 'development'
const dbConfig = knexConfig[environment]

async function runSeeds() {
  const db = knex(dbConfig)

  try {
    console.log('🌱 Running database seeds...')

    // Run seeds
    await db.seed.run()

    console.log('✅ Seeds completed successfully')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

runSeeds()
