# ---- Build stage ----
FROM node:22-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

# 👉 WORKDIR mới
WORKDIR /opt/app/be-gx

# Cache deps
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && yarn install --frozen-lockfile

# Copy source & build admin
COPY . .
ENV NODE_ENV=production
RUN yarn build

# ---- Runtime stage ----
FROM node:22-alpine AS runtime
RUN apk add --no-cache vips-dev

# 👉 WORKDIR mới
WORKDIR /opt/app/be-gx

# Copy built app
COPY --from=build /opt/app/be-gx ./

# Install production deps only
RUN yarn config set network-timeout 600000 -g && \
    yarn install --production --frozen-lockfile && \
    yarn cache clean

# Prepare folders + permissions
RUN mkdir -p /opt/app/be-gx/public/uploads /opt/app/be-gx/.tmp && \
    chown -R node:node /opt/app/be-gx && \
    chmod -R 755 /opt/app/be-gx/public/uploads /opt/app/be-gx/.tmp

ENV NODE_ENV=production
USER node

EXPOSE 1337
CMD ["yarn", "start"]
