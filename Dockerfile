FROM node:8.4-alpine
WORKDIR /app
RUN apk add --update openssl
RUN npm install --global nodemon knex
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN openssl genrsa -out private.key 2048
EXPOSE 8080
ENV NPM_CONFIG_LOGLEVEL warn
USER node
CMD ["node", "index.js"]
