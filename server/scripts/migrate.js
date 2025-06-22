// @ts-nocheck
import knex from 'knex'
import knexConfig from '../database/knexfile.js'
import { config as dotenvConfig } from 'dotenv'

// Load environment variables
dotenvConfig()

const environment = process.env.NODE_ENV || 'development'
const config = knexConfig[environment]

async function runMigrations() {
  const db = knex(config)

  try {
    console.log('🔄 Running database migrations...')

    // Run migrations
    await db.migrate.latest()

    console.log('✅ Migrations completed successfully')

    // Show migration status
    const status = await db.migrate.status()
    console.log(`📊 Migration status:`, status)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

runMigrations()
