FROM node:8.4-alpine
ENV HOME=/home/app
COPY package.json package-lock.json $HOME/rotas/
WORKDIR $HOME/rotas
RUN npm install --silent --progress=false
COPY . $HOME/rotas
EXPOSE 8080
ENV NPM_CONFIG_LOGLEVEL warn
USER node
CMD ["npm", "start"]
