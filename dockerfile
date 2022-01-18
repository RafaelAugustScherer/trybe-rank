FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4 as prod
COPY --from=build /app/build /usr/local/apache2/htdocs/
EXPOSE 5000