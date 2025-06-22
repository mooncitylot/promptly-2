// @ts-nocheck
import knex from 'knex'
import knexConfig from '../database/knexfile.js'
import { config } from 'dotenv'

// Load environment variables
config()

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
    const [batchNo, log] = await db.migrate.status()
    console.log(`📊 Migration batch: ${batchNo}`)
    console.log('📝 Migration log:', log)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

runMigrations()
