# Asignación 3

A full-stack student management system that allows CRUD operations for students and career assignments. Built with Node.js/Express backend, Angular frontend, PostgreSQL database, and Prisma ORM.

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)
- npm

### 1. Environment Setup
Copy the example environment file and configure your settings:
```bash
cp .env.example .env
```

Edit the `.env` file with your preferred database credentials.

### 2. Database Setup
Start the PostgreSQL database container and initialize the database schema with Prisma migrations:
```bash
# Start PostgreSQL container
docker compose up -d

# Install backend dependencies and setup database schema
cd backend
npm install
npm run prisma:migrate:dev
```

### 3. Backend Setup
Install dependencies and start the Express.js development server:
```bash
cd backend
npm install
npm run dev  # Development server on port 3000
```

### 4. Frontend Setup
Install Angular dependencies and start the development server:
```bash
cd frontend
npm install
npm start    # Development server on port 4200
```

## Access the Application

- **Frontend**: http://localhost:4200
- **Backend**: http://localhost:3000

## Additional Commands

### Database Management
Useful commands for managing your database and Prisma schema:
```bash
# View database in Prisma Studio
cd backend
npm run prisma:studio

# Generate Prisma client after schema changes
npm run prisma:generate

# Deploy migrations to production
npm run prisma:migrate:deploy
```

### Development
Common development commands for managing Docker containers and resetting data:
```bash
# Stop all services
docker compose down

# Restart database with fresh data
docker compose down -v && docker compose up -d
```