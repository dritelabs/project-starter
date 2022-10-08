FROM node:16-buster AS deps

ARG GRPC_HEALTH_PROBE_VERSION=v0.3.1

WORKDIR /usr/src/app

COPY ./package*.json ./lerna.json ./
COPY ./packages/db/package.json ./packages/db/
COPY ./packages/protobuf/package.json ./packages/protobuf/
COPY ./packages/server/package.json ./packages/server/

RUN npm ci --only=production
RUN cp -R node_modules node_modules_production
RUN npm ci

COPY ./packages/db ./packages/db
COPY ./packages/protobuf ./packages/protobuf
COPY ./packages/service ./packages/service
COPY ./packages/server ./packages/server

RUN npm run generate
RUN npm run build

RUN cp -R node_modules node_modules_development

RUN wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
  chmod +x /bin/grpc_health_probe

FROM node:16-alpine AS release

WORKDIR /usr/src/app

COPY --from=deps /bin/grpc_health_probe /bin/

COPY --from=deps /usr/src/app/package*.json /usr/src/app/lerna.json ./
COPY --from=deps /usr/src/app/node_modules_production ./node_modules

COPY --from=deps /usr/src/app/node_modules_development/@prisma/client/ ./node_modules/@prisma/client/
COPY --from=deps /usr/src/app/node_modules_development/.prisma/client/ ./node_modules/.prisma/client/

COPY --from=deps /usr/src/app/packages/db/dist  /usr/src/app/packages/db/dist
COPY --from=deps /usr/src/app/packages/db/package.json  /usr/src/app/packages/db/

COPY --from=deps /usr/src/app/packages/protobuf/dist /usr/src/app/packages/protobuf/dist
COPY --from=deps /usr/src/app/packages/protobuf/generated /usr/src/app/packages/protobuf/generated
COPY --from=deps /usr/src/app/packages/protobuf/package.json /usr/src/app/packages/protobuf/

COPY --from=deps /usr/src/app/packages/server/dist  /usr/src/app/packages/server/dist
COPY --from=deps /usr/src/app/packages/server/package.json  /usr/src/app/packages/server/

ENV HOST 0.0.0.0
ENV PORT 5000
ENV NODE_ENV production

CMD [ "npm", "start", "-w", "@driten/server"]
