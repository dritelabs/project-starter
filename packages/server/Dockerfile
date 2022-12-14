# TODO: add base description
FROM node:16 AS base

ARG GRPC_HEALTH_PROBE_VERSION=v0.3.1

RUN npm i -g pnpm

# TODO: add deps description
FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./lerna.json ./nx.json .npmrc ./
COPY ./packages/db/package.json ./packages/db/
COPY ./packages/protobuf/package.json ./packages/protobuf/
COPY ./packages/utils/package.json ./packages/utils/
COPY ./packages/server/package.json ./packages/server/

RUN pnpm install

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml lerna.json nx.json .npmrc ./
COPY ./packages/db ./packages/db
COPY ./packages/protobuf ./packages/protobuf
COPY ./packages/utils ./packages/utils
COPY ./packages/server ./packages/server

RUN wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
  chmod +x /bin/grpc_health_probe

# TODO: add build description
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/lerna.json /app/nx.json /app/.npmrc ./
COPY --from=deps /app/packages/db ./packages/db
COPY --from=deps /app/packages/protobuf ./packages/protobuf
COPY --from=deps /app/packages/utils ./packages/utils
COPY --from=deps /app/packages/server ./packages/server

RUN pnpm build
RUN pnpm prune --prod

# TODO: add release description
FROM node:16-alpine AS release

ENV HOST 0.0.0.0
ENV PORT 5000
ENV NODE_ENV production

WORKDIR /app

RUN addgroup -g 1001 -S projectname
RUN adduser -S drite -u 1001

COPY --from=deps --chown=drite:projectname /bin/grpc_health_probe /bin/

COPY --from=build --chown=drite:projectname /app/node_modules ./node_modules

COPY --from=build --chown=drite:projectname /app/packages/db/dist ./packages/db/dist
COPY --from=build --chown=drite:projectname /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=build --chown=drite:projectname /app/packages/db/package.json ./packages/db/

COPY --from=build --chown=drite:projectname /app/packages/protobuf/dist ./packages/protobuf/dist
COPY --from=build --chown=drite:projectname /app/packages/protobuf/proto ./packages/protobuf/proto
COPY --from=build --chown=drite:projectname /app/packages/protobuf/node_modules ./packages/protobuf/node_modules
COPY --from=build --chown=drite:projectname /app/packages/protobuf/package.json ./packages/protobuf/

COPY --from=build --chown=drite:projectname /app/packages/utils/dist ./packages/utils/dist
COPY --from=build --chown=drite:projectname /app/packages/utils/node_modules ./packages/utils/node_modules
COPY --from=build --chown=drite:projectname /app/packages/utils/package.json ./packages/utils/

COPY --from=build --chown=drite:projectname /app/packages/server/dist ./packages/server/dist
COPY --from=build --chown=drite:projectname /app/packages/server/node_modules ./packages/server/node_modules

USER drite

EXPOSE 3000

CMD ["node", "/app/packages/server/dist/index.mjs"]

