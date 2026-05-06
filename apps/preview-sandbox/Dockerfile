FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages/tenant-config/package.json ./packages/tenant-config/
COPY packages/booking-widget/package.json ./packages/booking-widget/
COPY packages/theme-kit/package.json ./packages/theme-kit/
COPY packages/themes/boutique/package.json ./packages/themes/boutique/
COPY packages/themes/resort/package.json ./packages/themes/resort/
COPY apps/preview-sandbox/package.json ./apps/preview-sandbox/
RUN pnpm install --frozen-lockfile=false

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV PMS_NEXT_STANDALONE=1
RUN pnpm --filter @pms/tenant-config --filter @pms/theme-kit --filter @pms/booking-widget --filter @pms/theme-boutique --filter @pms/theme-resort build && \
    pnpm --filter @pms/preview-sandbox build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/preview-sandbox/.next/standalone ./
COPY --from=builder /app/apps/preview-sandbox/.next/static ./apps/preview-sandbox/.next/static
EXPOSE 4100
ENV PORT=4100
WORKDIR /app/apps/preview-sandbox
CMD ["node", "server.js"]
