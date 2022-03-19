FROM node:alpine
WORKDIR /app
COPY . .

RUN npm i
RUN sed -i "s|http://localhost:3000|* |g" .env

CMD ["npm", "start"]

# heroku create tryberank-api
# heroku container:login
# heroku container:push web -a tryberank-api
# heroku container:release web -a tryberank-api