FROM node:alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY ./tests /usr/test


RUN npm install bcrypt
RUN npm i ts-node

CMD ["npm", "start"]

