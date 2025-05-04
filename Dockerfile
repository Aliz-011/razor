FROM oven/bun:1 AS builder
WORKDIR /app

# Only copy manifests first to leverage Docker cache
COPY package.json bun.lockb turbo.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
# Add COPY lines for any packages/*/package.json if they exist and are needed for install/build

# Install ALL dependencies needed for building
RUN bun install --frozen-lockfile

COPY . .

# Run the build using Turborepo
# This will build both 'server' and 'web' based on turbo.json
RUN bunx turbo build

RUN cd apps/server && bun install --production --frozen-lockfile

# Stage 2: Server Runner - Contains only the built Hono server and prod dependencies
FROM oven/bun:1 AS server-runner
WORKDIR /app

# Copy production node_modules from the builder stage
# COPY --from=builder /app/apps/server/node_modules ./apps/server/node_modules

# Copy the built server code from the builder stage
COPY --from=builder /app/apps/server/dist ./apps/server/dist

# Copy the server's package.json (needed for the start script)
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json

# Set the working directory to the server app
WORKDIR /app/apps/server

# Expose the port the Hono server listens on (adjust if needed)
# Use an ENV variable for flexibility
ENV PORT=3000
EXPOSE ${PORT}

CMD [ "bun", "run", "start" ]

# Stage 3: Web Runner -  Serves the static React build using Nginx
FROM nginx:stable-alpine AS web-server

COPY --from=builder /app/apps/web/.output/server/index.mjs /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off" ]