# 1. Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./lerna.json ./nx.json .npmrc ./

RUN npm i -g pnpm
RUN pnpm i
RUN cp -R node_modules node_modules_development
RUN pnpm i --prod


# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#   else echo "Lockfile not found." && exit 1; \
#   fi


# 2. Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=development
ENV PORT 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S drite -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=drite:nodejs /app/.next/standalone ./
COPY --from=builder --chown=drite:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000 5001


CMD ["node", "server.js"]








# # app base image

# FROM node:16

# ARG APP_DIR
# ARG APP_NAME

# ENV _APP_DIR=$APP_DIR

# WORKDIR /usr/src/accounts

# COPY . .

# RUN node ./common/scripts/install-run-rush.js update
# RUN node ./common/scripts/install-run-rush.js gen --to-except $APP_NAME
# RUN node ./common/scripts/install-run-rush.js build --to-except $APP_NAME

# # COPY --from=builder /app/packages/backend/node_modules/@prisma/client/ ./node_modules/@prisma/client/
# # COPY --from=builder /app/packages/backend/node_modules/.prisma/client/ ./node_modules/.prisma/client/

# EXPOSE 3000 4000 24678 24679

# CMD cd "/usr/src/accounts/apps/$_APP_DIR" && node /usr/src/accounts/common/scripts/install-run-rushx.js dev
