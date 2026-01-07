# ----------------------------
# STAGE 1: Build & Install
# ----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies (including devDependencies for build tools if needed)
RUN npm install

# ----------------------------
# STAGE 2: Production Runner
# ----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy your source code
COPY . .

# Change ownership to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port your app runs on (Based on your .env, likely 3000, 5000 or 8000)
EXPOSE 8000
ENV PORT=8000

# Start the application
# Ensure your package.json has a "start" script: "node index.js"
CMD ["npm", "start"]