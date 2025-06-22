#!/bin/bash

echo "🚀 Setting up Promptly Database..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing server dependencies..."
cd server
npm install

echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file from template"
else
    echo "✅ .env file already exists"
fi

echo "🗄️ Setting up database..."
npm run db:migrate
npm run db:seed

echo "✅ Database setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start the backend server: cd server && npm run dev"
echo "2. Start the frontend: npm start (from project root)"
echo "3. Open http://localhost:8080 in your browser"
echo ""
echo "📊 API will be available at: http://localhost:3001"
echo "🔍 Health check: http://localhost:3001/health" 