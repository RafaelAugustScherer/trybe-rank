FROM node:alpine
WORKDIR /app
COPY . .

RUN npm i

ENV REACT_APP_SERVER=https://tryberank-api.herokuapp.com

CMD ["npm", "start"]

# FROM nginx:1.16.0-alpine AS prod
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]