FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages/tenant-config/package.json ./packages/tenant-config/
COPY packages/theme-kit/package.json ./packages/theme-kit/
COPY apps/dashboard/package.json ./apps/dashboard/
RUN pnpm install --frozen-lockfile=false

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV PMS_NEXT_STANDALONE=1
RUN pnpm --filter @pms/tenant-config --filter @pms/theme-kit build && \
    pnpm --filter @pms/dashboard build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/dashboard/.next/standalone ./
COPY --from=builder /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public 2>/dev/null || true
EXPOSE 4300
ENV PORT=4300
WORKDIR /app/apps/dashboard
CMD ["node", "server.js"]
