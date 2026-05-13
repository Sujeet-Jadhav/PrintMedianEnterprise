#!/bin/bash
# Quick rebuild script for PrintMedian Enterprise
# Usage: ./rebuild.sh [frontend|backend|all]

set -e  # Exit on error

COMPOSE_FILE="docker-compose.dev.yml"
PROJECT_DIR="/f/PrintMedianEnterprise"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

rebuild_frontend() {
    echo -e "${YELLOW}🔨 Rebuilding Frontend...${NC}"
    cd "$PROJECT_DIR"
    docker compose -f "$COMPOSE_FILE" up -d --build frontend
    echo -e "${GREEN}✅ Frontend rebuilt successfully!${NC}"
    echo -e "Access at: http://localhost"
}

rebuild_backend() {
    echo -e "${YELLOW}🔨 Building Backend JAR...${NC}"
    cd "$PROJECT_DIR/Backend/printmedianenterprise"
    ./mvnw clean package -DskipTests
    
    echo -e "${YELLOW}🔨 Rebuilding Backend Docker container...${NC}"
    cd "$PROJECT_DIR"
    docker compose -f "$COMPOSE_FILE" up -d --build backend
    echo -e "${GREEN}✅ Backend rebuilt successfully!${NC}"
    echo -e "Access at: http://localhost:8080"
}

rebuild_all() {
    echo -e "${YELLOW}🔨 Rebuilding ALL services...${NC}"
    rebuild_backend
    rebuild_frontend
    echo -e "${GREEN}✅ All services rebuilt successfully!${NC}"
}

show_status() {
    echo -e "${YELLOW}📊 Container Status:${NC}"
    docker ps --filter "name=printmedian" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

case "$1" in
    frontend)
        rebuild_frontend
        show_status
        ;;
    backend)
        rebuild_backend
        show_status
        ;;
    all|"")
        rebuild_all
        show_status
        ;;
    *)
        echo -e "${RED}Usage: $0 [frontend|backend|all]${NC}"
        exit 1
        ;;
esac
