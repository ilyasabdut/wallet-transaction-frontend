FROM node:20-alpine AS builder

# Set environment variables for the build
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy application source code
COPY . .

RUN ls -al

# Debug: Check if the .env file exists
RUN ls -al .env && cat .env

# Build the React application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

# Expose the default Nginx port (80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
