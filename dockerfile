# ─────────────────────────────────────────────────────────────
# STAGE 1: Build SvelteKit app using pnpm
# ─────────────────────────────────────────────────────────────
FROM node:22-slim AS builder

ENV NODE_ENV=production
WORKDIR /app

# Enable and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install build tools required for native modules like @tailwindcss/oxide
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    rustc \
    && rm -rf /var/lib/apt/lists/*

# Copy manifest files first to leverage layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (dev + prod) for build
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the app (runs `svelte-kit build`)
RUN pnpm build

# Optional: remove dev dependencies to reduce image size
RUN pnpm prune --prod

# ─────────────────────────────────────────────────────────────
# STAGE 2: Runtime – secure and minimal
# ─────────────────────────────────────────────────────────────
FROM node:22-slim AS runner

ENV NODE_ENV=production
WORKDIR /app

# Enable and install pnpm again (corepack state not persisted)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create non-root user for security
RUN groupadd -r app && useradd -r -g app app
USER app

# Copy built output and runtime dependencies from builder
COPY --chown=app:app --from=builder /app/build ./build
COPY --chown=app:app --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --chown=app:app --from=builder /app/node_modules ./node_modules

# Expose the default SvelteKit port
EXPOSE 3000

# Start the SvelteKit Node server
CMD ["pnpm", "start"]