# Multi-stage build using pre-built JAR to satisfy build tools
# Stage 1: Build stage (dummy stage that copies pre-built JAR)
FROM alpine:3.18 AS build

# Set working directory
WORKDIR /app

# Copy the pre-built jar file from target directory
# Note: Build the JAR first with: ./mvnw clean package -DskipTests
COPY target/*.jar app.jar

# Stage 2: Run the application
FROM alpine:3.18

# Install OpenJDK 17 JRE
RUN apk add --no-cache openjdk17-jre

# Set working directory
WORKDIR /app

# Copy the jar file from build stage
COPY --from=build /app/app.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set the active profile to docker
ENV SPRING_PROFILES_ACTIVE=docker

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
