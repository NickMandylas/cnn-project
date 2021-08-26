FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.production .env

RUN yarn build


ENV NODE_ENV production
ENV NODE_PATH ./dist

EXPOSE 8080
CMD ["node", "dist/index.js"]

USER node