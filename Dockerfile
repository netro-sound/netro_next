FROM node:18-alpine as BUILD_IMAGE

# install pnpm
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# install dependencies
RUN pnpm install --frozen-lockfile
COPY . .
# build
RUN pnpm run build
# remove dev dependencies
RUN pnpm prune --prod

FROM node:18-alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000
CMD ["pnpm", "run", "start"]