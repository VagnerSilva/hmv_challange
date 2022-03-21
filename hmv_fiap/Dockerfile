FROM node:14-alpine as Build
WORKDIR /app
COPY package.json yarn.lock decorate-angular-cli.js ./
RUN yarn config set strict-ssl false -g
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.9.15-alpine
COPY --from=Build app/dist/apps/hmv-fiap /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
