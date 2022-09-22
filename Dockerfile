From node:alpine

WORKDIR /usr/app
COPY ./ .

COPY package*.json ./
RUN yarn install

RUN yarn global add nodemon
RUN yarn global add sequelize-cli
RUN yarn global add dotenv

CMD ["nodemon","-L","server.js"]