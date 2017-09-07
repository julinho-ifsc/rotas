FROM node:8.4-alpine
WORKDIR /app
RUN npm install --global nodemon
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 8080
ENV NPM_CONFIG_LOGLEVEL warn
USER node
CMD ["node", "index.js"]
