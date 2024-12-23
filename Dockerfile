FROM node:20-alpine AS builder

# Set build arguments
ARG REACT_APP_BACKEND_URL
ARG PORT

# Set environment variables
ENV NODE_ENV production
# Set environment variables for the build
ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ENV PORT=${PORT}

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy application source code
COPY . .

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
