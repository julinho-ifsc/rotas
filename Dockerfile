FROM node:8.4-alpine
WORKDIR /app
RUN apk add --update openssl
RUN npm install --global nodemon knex
COPY package.json package-lock.json ./
RUN openssl genrsa -out /app/private.key 2048
RUN openssl rsa -pubout -in /app/private.key -out /app/public.pem
RUN npm install
COPY . ./
EXPOSE 8080
ENV NPM_CONFIG_LOGLEVEL warn
USER node
CMD ["node", "index.js"]
