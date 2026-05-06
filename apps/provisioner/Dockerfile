FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages/tenant-config/package.json ./packages/tenant-config/
COPY apps/provisioner/package.json ./apps/provisioner/
RUN pnpm install --frozen-lockfile=false

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/tenant-config/node_modules ./packages/tenant-config/node_modules
COPY --from=deps /app/apps/provisioner/node_modules ./apps/provisioner/node_modules
COPY . .
RUN pnpm --filter @pms/tenant-config build && pnpm --filter @pms/provisioner build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
COPY --from=builder /app/apps/provisioner/dist ./apps/provisioner/dist
COPY --from=builder /app/apps/provisioner/package.json ./apps/provisioner/
COPY --from=builder /app/packages/tenant-config/dist ./packages/tenant-config/dist
COPY --from=builder /app/packages/tenant-config/package.json ./packages/tenant-config/
COPY --from=builder /app/pnpm-workspace.yaml /app/package.json ./
RUN pnpm install --prod --frozen-lockfile=false
EXPOSE 4200
ENV PORT=4200
WORKDIR /app/apps/provisioner
CMD ["node", "dist/server.js"]
