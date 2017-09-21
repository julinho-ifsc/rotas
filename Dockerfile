FROM node:8.4-alpine
WORKDIR /app
RUN apk add --update openssl
RUN npm install --global nodemon
COPY package.json package-lock.json ./
COPY . ./
RUN npm install
EXPOSE 8080
ENV NPM_CONFIG_LOGLEVEL warn
USER node
CMD ["node", "index.js"]
