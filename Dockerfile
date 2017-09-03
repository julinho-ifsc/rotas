FROM node:8.4

WORKDIR /app

COPY package.json package-lock.json index.js ./

RUN npm install

EXPOSE 80

CMD ["npm", "start"]