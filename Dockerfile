FROM node:22.14.0-alpine AS builder

WORKDIR /app

RUN npm i -g pnpm

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm fetch
RUN pnpm install -r --offline

COPY . .

RUN ORIGIN=https://www.nichita-r.com pnpm run build
RUN pnpm run postbuild

FROM nginx:1.27-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80