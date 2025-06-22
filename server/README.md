# Promptly Backend API

A simple REST API for managing prompts with SQLite database.

## Features

- ✅ Create, read, update, delete prompts
- ✅ Search prompts by title or content
- ✅ SQLite database with Knex.js ORM
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS support
- ✅ Security headers

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Setup

Copy the environment example file:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3001
NODE_ENV=development
DB_CLIENT=sqlite3
DB_FILENAME=./database/promptly.db
CORS_ORIGIN=http://localhost:8080
```

### 3. Database Setup

Run migrations to create tables:

```bash
npm run db:migrate
```

Seed the database with sample data:

```bash
npm run db:seed
```

### 4. Start the Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Prompts

| Method | Endpoint                       | Description       |
| ------ | ------------------------------ | ----------------- |
| GET    | `/api/v1/prompts`              | Get all prompts   |
| GET    | `/api/v1/prompts/:id`          | Get prompt by ID  |
| POST   | `/api/v1/prompts`              | Create new prompt |
| PUT    | `/api/v1/prompts/:id`          | Update prompt     |
| DELETE | `/api/v1/prompts/:id`          | Delete prompt     |
| GET    | `/api/v1/prompts/search/:term` | Search prompts    |

### Health Check

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | `/health` | Server health status |

## Database Schema

### Prompts Table

| Column     | Type      | Description                 |
| ---------- | --------- | --------------------------- |
| id         | INTEGER   | Primary key, auto-increment |
| title      | VARCHAR   | Prompt title (required)     |
| prompt     | TEXT      | Prompt content (required)   |
| created_at | TIMESTAMP | Creation timestamp          |
| updated_at | TIMESTAMP | Last update timestamp       |

## Example Usage

### Create a Prompt

```bash
curl -X POST http://localhost:3001/api/v1/prompts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Code Review Helper",
    "prompt": "You are an expert software developer. Review the following code and provide feedback on code quality, potential bugs, and improvements."
  }'
```

### Get All Prompts

```bash
curl http://localhost:3001/api/v1/prompts
```

### Search Prompts

```bash
curl http://localhost:3001/api/v1/prompts/search/code
```

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database (migrate + seed)

### Database Management

The app uses SQLite with Knex.js for database operations. The database file is stored at `./database/promptly.db`.

To reset the database:

```bash
npm run db:reset
```

## Integration with Frontend

Update your frontend API configuration to point to the backend:

```javascript
// In your frontend API service
const API_URL = 'http://localhost:3001/api/v1'
```

## Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Sanitize user input
- **SQL Injection Protection** - Knex.js query builder

## Troubleshooting

### Database Connection Issues

1. Check if the database file exists: `./database/promptly.db`
2. Ensure write permissions in the database directory
3. Run migrations: `npm run db:migrate`

### Port Already in Use

Change the port in `.env`:

```env
PORT=3002
```

### CORS Issues

Update the CORS origin in `.env`:

```env
CORS_ORIGIN=http://localhost:8080
```
