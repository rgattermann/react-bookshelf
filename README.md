# Bookshelf

Bookshelf é uma aplicação CRUD de livros que faz uso de react, reduz, styled-components.
Este projeto foi inicializado com create-react-app.

## Instalação

Será necessário já possuir o git e yarn instalados para dai sim.

```bash
git clone https://github.com/rgattermann/react-bookshelf

cd react-bookshelf

yarn install
```

## Execução
O projeto pode ser executado com o uso do yarn, assim como através do docker.

Para execução via yarn é preciso executar o seguinte comando:
```bash
yarn start
```

Assim a aplicação é inicializada no modo de desenvolvimento. Basta agora abrir seu navegador e acessar o seguinte endereço [http://localhost:3000](http://localhost:3000).

Para iniciar a aplicação via docker, antes é preciso ter o docker e docker-compose instalados. A partir disso, basta executar o seguinte comando:
```bash
docker-compose -up
```

A aplicação também é inicializada no modo de desenvolvimento. Bastando agora abrir seu navegador e acessar o seguinte endereço [http://localhost:3000](http://localhost:3000).

## Dados de login
A aplicação possui um usuário e senhas fixos, devendo ser informados os seguintes dados:
```bash
login: admin@admin.com
senha: password
```

## Execução dos testes
Para execução dos testes preciso executar o seguinte comando:
```bash
yarn test
```
