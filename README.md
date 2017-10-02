# rotas-julinho

[![Travis](https://img.shields.io/travis/julinho-ifsc/julinho.svg)](https://travis-ci.org/julinho-ifsc/julinho)
[![](https://images.microbadger.com/badges/image/julinho/rotas.svg)](https://microbadger.com/images/julinho/rotas "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/julinho/rotas.svg)](https://microbadger.com/images/julinho/rotas "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/license/julinho/rotas.svg)](https://microbadger.com/images/julinho/rotas "Get your own license badge on microbadger.com")
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> API para o controle de rotas

## Utilização

```sh
$ openssl genrsa -out private.key 4096
$ openssl rsa -pubout -in private.key -out public.pem
$ cp .env.example .env
$ docker-compose -f docker-compose.development up
$ docker exec rotas_web_1 npm run migrate
$ docker exec rotas_web_1 npm run seed
```

## Licença

[MIT License](LICENSE) &copy; [Marvie Technologies](https://marvietech.com.br/)
