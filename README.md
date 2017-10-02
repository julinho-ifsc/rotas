# rotas-julinho

```sh
openssl genrsa -out private.key 4096
openssl rsa -pubout -in private.key -out public.pem
cp .env.example .env
docker-compose up
docker exec rotas_web_1 npm run migrate
docker exec rotas_web_1 npm run seed
```

## Imagem da aplicação
[![](https://images.microbadger.com/badges/image/julinho/rotas.svg)](https://microbadger.com/images/julinho/rotas "Get your own image badge on microbadger.com")

[![](https://images.microbadger.com/badges/version/julinho/rotas.svg)](https://microbadger.com/images/julinho/rotas "Get your own version badge on microbadger.com")

[![](https://images.microbadger.com/badges/license/julinho/rotas.svg)](https://microbadger.com/images/julinho/rotas "Get your own license badge on microbadger.com")
