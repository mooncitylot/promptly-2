# PostgreSQL Setup for Render

## ✅ What's Been Done

Your codebase has been updated to support PostgreSQL:

1. **Added PostgreSQL dependency** (`pg` package)
2. **Updated `knexfile.js`** to use PostgreSQL in production
3. **Created User model** (`server/models/User.js`)
4. **Created User routes** (`server/routes/users.js`) with:
   - Registration endpoint
   - Login endpoint
   - Profile endpoint
5. **Updated `render.yaml`** to remove SQLite config
6. **Updated `server.js`** to include user routes

## 🚀 Next Steps on Render

### 1. Create PostgreSQL Database on Render

1. Go to your Render dashboard
2. Click **"New +"** → **"PostgreSQL"**
3. Name it something like `promptly-database`
4. Choose your region
5. Click **"Create Database"**

### 2. Connect Database to Your Web Service

1. In your PostgreSQL database settings, copy the **"External Database URL"**
2. Go to your web service (`promptly-backend`)
3. In **"Environment"** section, add these variables:
   ```
   DB_HOST=your-postgres-host
   DB_PORT=5432
   DB_USER=your-postgres-user
   DB_PASSWORD=your-postgres-password
   DB_NAME=your-postgres-database
   ```
4. Or use the **"Connect"** button in Render to automatically link them

### 3. Deploy

1. Push your changes to GitHub
2. Render will automatically redeploy
3. The migration will run during build and create your tables

## 🔧 API Endpoints

Once deployed, you'll have these new endpoints:

- `POST /api/v1/users/register` - Create new user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/profile` - Get user profile (requires JWT token)

## 📝 Example Usage

### Register a user:

```bash
curl -X POST https://your-app.onrender.com/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Login:

```bash
curl -X POST https://your-app.onrender.com/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## 🎉 Benefits

- **Data persistence** - Your data survives service restarts
- **Scalability** - PostgreSQL can handle more data and concurrent users
- **User authentication** - Full user management system ready
- **Security** - Passwords are hashed, JWT tokens for sessions

Your app is now production-ready with persistent data storage! 🚀
