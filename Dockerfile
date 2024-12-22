# Stage 1: Build the React application
FROM node:20-alpine AS builder

ENV NODE_ENV production

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm cache clean --force && npm ci --only=production

# Copy code and build
COPY . .

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

# Stage 2: Create the production Docker image
FROM builder

WORKDIR /app

# Copy built application
COPY --from=builder /app/build .

EXPOSE 3030

CMD ["npm", "start"]
