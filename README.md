# Print Median Enterprise - Full Stack Application

## Project Overview
Print Median Enterprise is a full-stack web application built for managing print media services. The application consists of a Spring Boot backend API and an Angular frontend.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.4
- **Java Version**: 17
- **Database**: MySQL
- **Security**: Spring Security with JWT Authentication
- **ORM**: Spring Data JPA
- **Build Tool**: Maven

### Frontend
- **Framework**: Angular
- **Language**: TypeScript
- **Build Tool**: Angular CLI

## Project Structure

```
PrintMedianEnterprise/
├── Backend/
│   └── printmedianenterprise/
│       ├── src/main/java/com/backend/printmedianenterprise/
│       │   ├── Controller/          # REST API Controllers
│       │   ├── Entity/             # JPA Entities
│       │   ├── Dto/                # Data Transfer Objects
│       │   ├── Repository/         # Data Access Layer
│       │   ├── Services/           # Business Logic Layer
│       │   ├── Config/             # Configuration Classes
│       │   ├── Util/               # Utility Classes
│       │   └── Filters/            # Custom Filters
│       ├── src/main/resources/
│       │   └── application.properties
│       └── pom.xml
└── Frontend/
    ├── src/app/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    ├── package.json
    └── angular.json
```

## Backend Architecture Explanation

### 1. Application Entry Point
- **PrintmedianenterpriseApplication.java**: Main Spring Boot application class with `@SpringBootApplication` annotation

### 2. Entity Layer
- **Category.java**: JPA entity representing product categories
  - Uses Lombok annotations for getters/setters
  - Maps to `category` table in database
  - Contains id, name, and description fields

### 3. Data Transfer Objects (DTOs)
- **CategoryDto.java**: Data transfer object for category operations
- **AuthenticationRequest.java**: DTO for login requests
- **SignupRequest.java**: DTO for user registration
- **UserDto.java**: DTO for user data transfer

### 4. Repository Layer
- **CategoryRepository.java**: Extends JpaRepository for database operations
- **UserRepository.java**: Repository for user-related database operations

### 5. Service Layer
- **CategoryService.java**: Interface defining category business logic
- **CategoryServiceImpl.java**: Implementation of category service
- **AuthService.java**: Authentication and user management services

### 6. Controller Layer
- **CategoryController.java**: REST endpoints for category management
- **AuthController.java**: Authentication endpoints (login, signup)

### 7. Security Configuration
- **SecurityConfig.java**: Spring Security configuration
- **JwtUtil.java**: JWT token utility for authentication
- **SimpleCorFilter.java**: CORS configuration

## Database Configuration

The application uses MySQL database with the following configuration:
- **Database Name**: print_median_enterprise
- **URL**: jdbc:mysql://localhost:3306/print_median_enterprise
- **Username**: root
- **Password**: root
- **Server**: 192.168.29.85:8080

## Important Commands

### Backend Commands (Run from Backend/printmedianenterprise directory)

```bash
# Navigate to backend directory
cd "D:\Project\PrintMedianEnterprise\Backend\printmedianenterprise"

# Run the Spring Boot application
mvn spring-boot:run

# Alternative: Run with Maven wrapper
./mvnw spring-boot:run

# Clean and install dependencies
mvn clean install

# Run tests
mvn test

# Package the application
mvn package
```

### Frontend Commands (Run from Frontend directory)

```bash
# Navigate to frontend directory
cd "D:\Project\PrintMedianEnterprise\Frontend"

# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test
```

## API Endpoints

### Authentication Endpoints
- **POST /authenticate**: User login
- **POST /sign-up**: User registration

### Category Management
- **POST /api/category**: Create new category

## Prerequisites

Before running the application, ensure you have:

1. **Java 17** installed
2. **Maven 3.6+** installed
3. **MySQL** server running
4. **Node.js** and **npm** installed
5. **Angular CLI** installed globally (`npm install -g @angular/cli`)

## Setup Instructions

### Database Setup
1. Install MySQL
2. Create database: `CREATE DATABASE print_median_enterprise;`
3. Update database credentials in `application.properties` if needed

### Backend Setup
1. Navigate to backend directory
2. Run `mvn clean install`
3. Start the application with `mvn spring-boot:run`
4. Backend will be available at `http://192.168.29.85:8080`

### Frontend Setup
1. Navigate to frontend directory
2. Run `npm install`
3. Start with `ng serve`
4. Frontend will be available at `http://localhost:4200`

## Features

- **User Authentication**: JWT-based authentication system
- **Category Management**: CRUD operations for product categories
- **CORS Support**: Cross-origin resource sharing enabled
- **Security**: Spring Security integration
- **Database Integration**: MySQL with JPA/Hibernate

## Development Notes

- Backend runs on port 8080
- Frontend runs on port 4200
- JWT tokens are used for authentication
- All API endpoints are prefixed with `/api`
- CORS is configured to allow frontend-backend communication

## Troubleshooting

### Common Issues

1. **Maven plugin not found**: Ensure you're running commands from the correct directory (`Backend/printmedianenterprise`)
2. **Database connection issues**: Verify MySQL is running and credentials are correct
3. **Port conflicts**: Ensure ports 8080 and 4200 are available

### Logs Location
- Application logs are displayed in the console
- Enable SQL logging with `spring.jpa.show-sql=true` (already enabled)
