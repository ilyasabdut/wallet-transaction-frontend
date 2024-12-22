# Stage 1: Build the React application
FROM node:21-alpine AS builder


# Set build arguments
ARG REACT_APP_BACKEND_URL
ARG PORT

# Set environment variables
ENV NODE_ENV production
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ENV PORT=${PORT}

WORKDIR /app

# Install dependencies
COPY package*.json ./

# RUN npm cache clean --force && npm ci --only=production

# RUN npm ci --only=production

RUN npm install --omit=dev

# Copy code and build
COPY . .

# Create the .env file with the environment variables
RUN echo "REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}" > .env && \
    echo "PORT=${PORT}" >> .env && \
    npm run build

# Stage 2: Create the production Docker image
FROM builder

# WORKDIR /app

# # Copy built application
# COPY --from=builder /app/build .

# EXPOSE 3030

# CMD ["npm", "start"]


# Serve the build using Nginx
FROM nginx:alpine

# Copy build output from previous step
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
