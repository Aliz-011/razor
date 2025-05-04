# syntax=docker/dockerfile:1
ARG BUN_VERSION=1.2
FROM oven/bun:${BUN_VERSION}-alpine AS base

WORKDIR /app

# Install build dependencies if needed (none for bun/alpine by default)

# --- Builder stage ---
FROM base AS builder

# Copy only the lockfile and package.json for dependency install
COPY --link ../../bun.lockb /app/bun.lockb
COPY --link package.json /app/package.json

# Set up Bun cache
ENV BUN_INSTALL_CACHE=/root/.bun/install/cache

# Install dependencies (including devDependencies for build)
RUN --mount=type=cache,target=${BUN_INSTALL_CACHE} \
    bun install --frozen-lockfile

# Copy the rest of the source code (excluding .env and files in .dockerignore)
COPY --link . /app

# Build the TypeScript project (output to ./dist)
RUN --mount=type=cache,target=${BUN_INSTALL_CACHE} \
    bun run build

# --- Production image ---
FROM base AS final

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production dependencies and built output
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist

# If you need static assets or other runtime files, copy them here
# (e.g., migrations, public, etc. -- not present in this project)

# Set permissions
USER appuser

EXPOSE 3000

# Use Bun to run the built server
CMD ["bun", "run", "start"]
