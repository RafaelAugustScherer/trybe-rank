FROM node:alpine AS build
WORKDIR /app
COPY . .
ENV REACT_APP_SERVER=https://tryberank-api.herokuapp.com
RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./deploy/default.conf.template /etc/nginx/conf.d/default.conf.template
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

# heroku container:login
# heroku container:push web -a tryberank
# heroku container:release web -a tryberank