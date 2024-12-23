FROM node:20-alpine AS builder

<<<<<<< Updated upstream

# Set build arguments
ARG REACT_APP_BACKEND_URL
ARG PORT

# Set environment variables
ENV NODE_ENV production
=======
ARG REACT_APP_BACKEND_URL
ARG PORT

ENV NODE_ENV=production
>>>>>>> Stashed changes
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ENV PORT=${PORT}

WORKDIR /app

COPY package*.json ./
<<<<<<< Updated upstream

# RUN npm cache clean --force && npm ci --only=production

# RUN npm ci --only=production

RUN npm install --omit=dev

# Copy code and build
=======

RUN npm install

>>>>>>> Stashed changes
COPY . .
RUN echo "REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}" > .env && \
    echo "PORT=${PORT}" >> .env && \
<<<<<<< Updated upstream
    npm run build
=======
    cat .env

# Build the React application
RUN npm run build
>>>>>>> Stashed changes

# Stage 2: Create the production Docker image
FROM builder

# WORKDIR /app

# # Copy built application
# COPY --from=builder /app/build .

# EXPOSE 3030

# CMD ["npm", "start"]


# Serve the build using Nginx
FROM nginx:alpine

<<<<<<< Updated upstream
# Copy build output from previous step
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
=======
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

# Expose the default Nginx port (80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
>>>>>>> Stashed changes
