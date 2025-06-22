// @ts-nocheck
import knex from 'knex'
import knexConfig from '../database/knexfile.js'
import { config } from 'dotenv'

// Load environment variables
config()

const environment = process.env.NODE_ENV || 'development'
const dbConfig = knexConfig[environment]

async function resetDatabase() {
  const db = knex(dbConfig)

  try {
    console.log('🔄 Resetting database...')

    // Run migrations (this will create tables)
    await db.migrate.latest()
    console.log('✅ Migrations completed')

    // Run seeds (this will populate with sample data)
    await db.seed.run()
    console.log('✅ Seeds completed')

    console.log('✅ Database reset completed successfully')
  } catch (error) {
    console.error('❌ Database reset failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

resetDatabase()
