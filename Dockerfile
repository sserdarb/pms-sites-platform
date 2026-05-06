# Tek root Dockerfile — 3 servis için multi-target.
# Her Coolify app, BUILD_TARGET env var (is_buildtime=true) ile target seçer:
#   provisioner-runner | preview-runner | dashboard-runner
# Docker yalnız seçilen target'a bağlı stage'leri build eder; diğerleri atlanır.

ARG BUILD_TARGET=provisioner-runner

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

# ============================================================================
# Workspace dep install (tüm node_modules)
# ============================================================================
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages ./packages
COPY apps ./apps
RUN pnpm install --frozen-lockfile=false

# ============================================================================
# PROVISIONER
# ============================================================================
FROM deps AS provisioner-builder
RUN pnpm --filter @pms/tenant-config build && pnpm --filter @pms/provisioner build

FROM node:22-alpine AS provisioner-runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY --from=provisioner-builder /app /app
EXPOSE 4200
ENV PORT=4200
WORKDIR /app/apps/provisioner
CMD ["node", "dist/server.js"]

# ============================================================================
# PREVIEW-SANDBOX (Next.js)
# ============================================================================
FROM deps AS preview-builder
ENV PMS_NEXT_STANDALONE=1
RUN pnpm --filter @pms/tenant-config --filter @pms/theme-kit --filter @pms/booking-widget --filter @pms/theme-boutique --filter @pms/theme-resort build && \
    pnpm --filter @pms/preview-sandbox build

FROM node:22-alpine AS preview-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=preview-builder /app/apps/preview-sandbox/.next/standalone /app
COPY --from=preview-builder /app/apps/preview-sandbox/.next/static /app/apps/preview-sandbox/.next/static
EXPOSE 4100
ENV PORT=4100
WORKDIR /app/apps/preview-sandbox
CMD ["node", "server.js"]

# ============================================================================
# DASHBOARD (Next.js)
# ============================================================================
FROM deps AS dashboard-builder
ENV PMS_NEXT_STANDALONE=1
RUN pnpm --filter @pms/tenant-config --filter @pms/theme-kit build && \
    pnpm --filter @pms/dashboard build

FROM node:22-alpine AS dashboard-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dashboard-builder /app/apps/dashboard/.next/standalone /app
COPY --from=dashboard-builder /app/apps/dashboard/.next/static /app/apps/dashboard/.next/static
EXPOSE 4300
ENV PORT=4300
WORKDIR /app/apps/dashboard
CMD ["node", "server.js"]

# ============================================================================
# Final selector — ARG'a göre yalnız bu stage'in zinciri build edilir
# ============================================================================
FROM ${BUILD_TARGET} AS final
