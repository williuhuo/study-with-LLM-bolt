# Study With LLM - Setup Guide

This guide will help you set up the Study With LLM application for development or production.

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)
- PostgreSQL (for local development without Docker)

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd study-with-llm
   ```

2. **Set up environment variables**
   ```bash
   make setup
   ```
   This will create `.env` files. Edit them with your configuration:
   - Add your OpenAI API key
   - Update database credentials if needed

3. **Start the application**
   ```bash
   make up
   ```

4. **Run database migrations**
   ```bash
   make migrate
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Local Development Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements-dev.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start PostgreSQL and Redis**
   ```bash
   docker-compose up -d db redis
   ```

6. **Run migrations**
   ```bash
   alembic upgrade head
   ```

7. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/study_llm_db
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/study_llm_test_db

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI
OPENAI_API_KEY=your-openai-api-key-here

# Redis
REDIS_URL=redis://localhost:6379

# File Upload
MAX_FILE_SIZE=50000000
UPLOAD_DIR=./uploads

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Environment
ENVIRONMENT=development
DEBUG=True
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
```

## Database Setup

### Using Docker (Recommended)
```bash
docker-compose up -d db
make migrate
```

### Manual PostgreSQL Setup
1. Install PostgreSQL
2. Create databases:
   ```sql
   CREATE DATABASE study_llm_db;
   CREATE DATABASE study_llm_test_db;
   CREATE USER study_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE study_llm_db TO study_user;
   GRANT ALL PRIVILEGES ON DATABASE study_llm_test_db TO study_user;
   ```
3. Update DATABASE_URL in .env
4. Run migrations: `alembic upgrade head`

## Testing

### Backend Tests
```bash
# With Docker
make test

# Local
cd backend
pytest

# With coverage
pytest --cov=app --cov-report=html
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Production Deployment

1. **Set up production environment variables**
   ```bash
   cp .env.example .env
   # Edit with production values
   ```

2. **Deploy with Docker Compose**
   ```bash
   make prod-up
   ```

3. **Run migrations**
   ```bash
   docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head
   ```

## Useful Commands

```bash
# View logs
make logs
make logs-backend
make logs-frontend

# Access containers
make shell-backend
make shell-frontend
make shell-db

# Database operations
make migrate                    # Run migrations
make migration MESSAGE="desc"   # Create new migration

# Cleanup
make down                      # Stop services
make clean                     # Remove containers and volumes
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Stop other services using ports 3000, 8000, 5432, 6379
   - Or modify ports in docker-compose.yml

2. **Database connection errors**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env
   - Verify database exists

3. **OpenAI API errors**
   - Verify OPENAI_API_KEY is set correctly
   - Check API key has sufficient credits

4. **File upload issues**
   - Ensure uploads directory exists and is writable
   - Check MAX_FILE_SIZE setting

### Getting Help

1. Check the logs: `make logs`
2. Verify environment variables are set correctly
3. Ensure all services are running: `docker-compose ps`
4. Check the API documentation at http://localhost:8000/docs

## Development Workflow

1. **Making Changes**
   - Backend: Changes auto-reload with uvicorn --reload
   - Frontend: Changes auto-reload with npm start

2. **Database Changes**
   ```bash
   # Create migration
   make migration MESSAGE="add new table"
   
   # Apply migration
   make migrate
   ```

3. **Adding Dependencies**
   - Backend: Add to requirements.txt, rebuild container
   - Frontend: `npm install package-name`, rebuild container

4. **Running Tests**
   ```bash
   make test                    # Backend tests
   cd frontend && npm test      # Frontend tests
   ```

This setup provides a robust development environment with hot reloading, comprehensive testing, and easy deployment options.