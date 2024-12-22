# Stage 1: Build the React application
FROM node:21-alpine AS builder

# Set build arguments
ARG REACT_APP_BACKEND_URL
ARG PORT

# Set environment variables for the build
ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ENV PORT=${PORT}

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Create the .env file with the environment variables
RUN echo "REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}" > .env && \
    echo "PORT=${PORT}" >> .env && \
    cat .env  && \
    npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy build output from the builder stage to the Nginx directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port (default to 80 if not overridden at runtime)
EXPOSE ${PORT:-80}

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
