# EffZeDuSR - Docker orchestration
# Run the whole stack (frontend + backend) with a single command:
#
#   make run
#
COMPOSE ?= docker compose

.DEFAULT_GOAL := help

.PHONY: help run up down restart rebuild build logs logs-backend logs-frontend \
        ps backend-sh frontend-sh clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "  Frontend -> http://localhost:5173"
	@echo "  Backend  -> http://localhost:3000"

run: up ## Alias for 'up'

up: ## Build (if needed) and start frontend + backend in the background
	$(COMPOSE) up -d --build
	@echo ""
	@echo "Frontend -> http://localhost:5173"
	@echo "Backend  -> http://localhost:3000"

down: ## Stop and remove the containers
	$(COMPOSE) down

restart: ## Restart the stack
	$(COMPOSE) restart

rebuild: ## Force a clean rebuild of the images, then start
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d

build: ## Build the images without starting
	$(COMPOSE) build

logs: ## Follow logs from all services
	$(COMPOSE) logs -f

logs-backend: ## Follow backend logs
	$(COMPOSE) logs -f backend

logs-frontend: ## Follow frontend logs
	$(COMPOSE) logs -f frontend

ps: ## Show container status
	$(COMPOSE) ps

backend-sh: ## Open a shell inside the backend container
	$(COMPOSE) exec backend bash

frontend-sh: ## Open a shell inside the frontend container
	$(COMPOSE) exec frontend bash

clean: ## Stop everything and remove images + named volumes
	$(COMPOSE) down -v --rmi local
