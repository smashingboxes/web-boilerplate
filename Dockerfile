FROM node:7

RUN npm install yarn -g
RUN yarn global add webpack

WORKDIR /app

EXPOSE 8080
