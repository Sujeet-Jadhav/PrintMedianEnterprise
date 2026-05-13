# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with network timeout and cache optimization
RUN npm ci --legacy-peer-deps --prefer-offline --no-audit --maxsockets 5 || \
    npm install --legacy-peer-deps --prefer-offline --no-audit --maxsockets 5

# Copy source code
COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built app from build stage to Nginx
# The browser folder contains the actual application files
COPY --from=build /app/dist/print-median-enterprise/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

