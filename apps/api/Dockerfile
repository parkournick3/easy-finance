# to build the image run: docker build -t api .
# to run the container run: docker run --env-file .env -e DATABASE_URL=postgresql://user:password@host.docker.internal:5433/easy-finance -p 3333:3333 api

FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

WORKDIR /usr/src/app

COPY package.json ./
RUN pnpm install

COPY . .
RUN pnpm prisma generate
RUN pnpm run build

FROM base AS production

WORKDIR /usr/src/app

COPY package.json ./

COPY --from=build /usr/src/app/node_modules ./node_modules

RUN pnpm install --prod --no-optional

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3333

CMD [ "node", "dist/main.js" ]
