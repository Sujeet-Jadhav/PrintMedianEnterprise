#!/bin/bash
# Build and Run Script for Git Bash
# This script builds your Spring Boot app and runs it with Docker

echo "=========================================="
echo "Print Median Enterprise - Build & Deploy"
echo "=========================================="
echo ""

# Step 1: Build the application
echo "Step 1: Building Spring Boot application..."
./mvnw clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✓ Build successful!"
else
    echo "✗ Build failed. Please check the errors above."
    exit 1
fi

echo ""

# Step 2: Build Docker image
echo "Step 2: Building Docker image..."
docker build -f Dockerfile.local -t printmedian-backend .

if [ $? -eq 0 ]; then
    echo "✓ Docker image built successfully!"
else
    echo "✗ Docker build failed. Please check the errors above."
    exit 1
fi

echo ""

# Step 3: Start containers
echo "Step 3: Starting containers with docker-compose..."
docker-compose up -d

if [ $? -eq 0 ]; then
    echo "✓ Containers started successfully!"
else
    echo "✗ Failed to start containers. Please check the errors above."
    exit 1
fi

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Your application is now running at:"
echo "  Backend: http://localhost:8080"
echo "  MySQL:   localhost:3307"
echo ""
echo "Useful commands:"
echo "  Check status:    docker ps"
echo "  View logs:       docker logs -f print-median-backend"
echo "  Stop all:        docker-compose down"
echo ""

