# rotas-julinho

```sh
openssl genrsa -out private.key 4096
openssl rsa -pubout -in private.key -out public.pem
cp .env.example .env
docker-compose up
docker exec rotas_web_1 npm run migrate
docker exec rotas_web_1 npm run seed
```
