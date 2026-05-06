# Tek root Dockerfile — 3 servis için multi-target build.
# Coolify her uygulama için "Docker Build Stage Target" değerini set eder:
#   provisioner-runner | preview-runner | dashboard-runner

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

# ============================================================================
# Workspace dep install (tüm node_modules yüklenir, transpile için yeterli)
# ============================================================================
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages ./packages
COPY apps ./apps
RUN pnpm install --frozen-lockfile=false

# ============================================================================
# PROVISIONER
# ============================================================================
FROM base AS provisioner-builder
COPY --from=deps /app ./
RUN pnpm --filter @pms/tenant-config build && pnpm --filter @pms/provisioner build

FROM node:22-alpine AS provisioner-runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY --from=provisioner-builder /app ./
EXPOSE 4200
ENV PORT=4200
WORKDIR /app/apps/provisioner
CMD ["node", "dist/server.js"]

# ============================================================================
# PREVIEW-SANDBOX (Next.js)
# ============================================================================
FROM base AS preview-builder
COPY --from=deps /app ./
ENV PMS_NEXT_STANDALONE=1
RUN pnpm --filter @pms/tenant-config --filter @pms/theme-kit --filter @pms/booking-widget --filter @pms/theme-boutique --filter @pms/theme-resort build && \
    pnpm --filter @pms/preview-sandbox build

FROM node:22-alpine AS preview-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=preview-builder /app/apps/preview-sandbox/.next/standalone ./
COPY --from=preview-builder /app/apps/preview-sandbox/.next/static ./apps/preview-sandbox/.next/static
EXPOSE 4100
ENV PORT=4100
WORKDIR /app/apps/preview-sandbox
CMD ["node", "server.js"]

# ============================================================================
# DASHBOARD (Next.js)
# ============================================================================
FROM base AS dashboard-builder
COPY --from=deps /app ./
ENV PMS_NEXT_STANDALONE=1
RUN pnpm --filter @pms/tenant-config --filter @pms/theme-kit build && \
    pnpm --filter @pms/dashboard build

FROM node:22-alpine AS dashboard-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dashboard-builder /app/apps/dashboard/.next/standalone ./
COPY --from=dashboard-builder /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
EXPOSE 4300
ENV PORT=4300
WORKDIR /app/apps/dashboard
CMD ["node", "server.js"]
