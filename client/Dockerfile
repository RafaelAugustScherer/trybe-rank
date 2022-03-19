FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN ["npm", "i"]
ENV REACT_APP_SERVER=https://tryberank-api.herokuapp.com

ENTRYPOINT ["npm", "start"]

# FROM nginx:alpine
# COPY ./build /usr/share/nginx/html
# COPY ./nginx /etc/nginx/conf.d/default.conf
# RUN ["envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf"]
# CMD ["nginx", "-g", "daemon off;"]


# FROM nginx:1.16.0-alpine AS prod
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

# heroku container:login
# heroku container:push web -a tryberank
# heroku container:release web -a tryberank