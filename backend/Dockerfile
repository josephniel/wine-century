FROM node:18-alpine

ENV NODE_ENV development
ENV API_PORT 80

WORKDIR /app

COPY package*.json .

COPY yarn*.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE $API_PORT

CMD [ "node", "dist/app.js" ]
