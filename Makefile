.PHONY: help build up down logs shell test clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build all services
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs for all services
	docker-compose logs -f

logs-backend: ## Show backend logs
	docker-compose logs -f backend

logs-frontend: ## Show frontend logs
	docker-compose logs -f frontend

shell-backend: ## Open shell in backend container
	docker-compose exec backend bash

shell-frontend: ## Open shell in frontend container
	docker-compose exec frontend sh

shell-db: ## Open PostgreSQL shell
	docker-compose exec db psql -U user -d study_llm_db

test: ## Run backend tests
	docker-compose exec backend pytest

test-coverage: ## Run tests with coverage
	docker-compose exec backend pytest --cov=app --cov-report=html

migrate: ## Run database migrations
	docker-compose exec backend alembic upgrade head

migration: ## Create new migration (usage: make migration MESSAGE="description")
	docker-compose exec backend alembic revision --autogenerate -m "$(MESSAGE)"

clean: ## Clean up containers and volumes
	docker-compose down -v
	docker system prune -f

install-backend: ## Install backend dependencies
	cd backend && pip install -r requirements-dev.txt

install-frontend: ## Install frontend dependencies
	cd frontend && npm install

dev-backend: ## Run backend in development mode
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend: ## Run frontend in development mode
	cd frontend && npm start

setup: ## Initial project setup
	cp .env.example .env
	cp backend/.env.example backend/.env
	cp frontend/.env.example frontend/.env
	@echo "Please edit the .env files with your configuration"

prod-up: ## Start production environment
	docker-compose -f docker-compose.prod.yml up -d

prod-down: ## Stop production environment
	docker-compose -f docker-compose.prod.yml down

prod-logs: ## Show production logs
	docker-compose -f docker-compose.prod.yml logs -f