FROM node:alpine
WORKDIR /app
COPY . .

RUN npm i

CMD ["npm", "start"]

# heroku container:login
# heroku container:push web -a tryberank-api
# heroku container:release web -a tryberank-api