FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx AS prod
COPY --from=build app/build/index.html /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
ENTRYPOINT ["/usr/sbin/nginx"]
CMD -g daemon off;
EXPOSE 80