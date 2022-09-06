FROM node:16-alpine

ARG user
ENV MYSQL_USER $user

ARG pass
ENV MYSQL_PASSWORD $pass

ARG db
ENV MYSQL_DATABASE $db

ARG root
ENV MYSQL_ROOT_PASSWORD $root

WORKDIR /usr/src/app

COPY package*.json ./

ADD package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]