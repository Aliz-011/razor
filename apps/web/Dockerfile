# syntax=docker/dockerfile:1
ARG BUN_VERSION=1.2
FROM oven/bun:${BUN_VERSION}-alpine AS base

WORKDIR /app

# Install dependencies only, leveraging cache for bun install
FROM base AS deps

# Only copy the lockfile and package.json for dependency install
COPY --link package.json ./
COPY --link ../../bun.lockb ./bun.lockb

ENV BUN_INSTALL_CACHE=/root/.bun/install/cache
RUN --mount=type=cache,target=${BUN_INSTALL_CACHE} \
    bun install --frozen-lockfile --production

# Build the app
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

# Copy the rest of the app source code (excluding .env and secrets)
COPY --link . ./

# Build the app (using vinxi build)
RUN --mount=type=cache,target=${BUN_INSTALL_CACHE} \
    bun run build

# Final image
FROM base AS final

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built app and production dependencies only
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vinxi.config.mjs ./vinxi.config.mjs
COPY --from=builder /app/public ./public

USER appuser

EXPOSE 3001
CMD ["bun", "run", "start"]
