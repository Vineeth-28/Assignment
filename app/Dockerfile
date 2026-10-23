# ==========================================
# STAGE 1: The Dependency Environment
# ==========================================
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency manifests first to leverage Docker's caching mechanism
COPY package*.json ./

# Install only production dependencies (skips nodemon to save space and enhance security)
RUN npm ci --omit=dev


# ==========================================
# STAGE 2: The Secure Runtime Environment
# ==========================================
FROM node:20-alpine AS runner

# Optimize Express for production performance and error handling
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy the pre-installed, production-only node_modules and manifests from Stage 1
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy your actual application source directory
COPY ./src ./src

# Switch from 'root' to the pre-configured 'node' user for security
USER node

# Express default or typical port (update if your server.js/index.js uses a different port)
EXPOSE 3000

# Start the application using your verified production entry point
CMD ["node", "src/index.js"]
