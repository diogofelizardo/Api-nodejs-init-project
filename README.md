
# API Basico em Nodejs
> Trata-se de uma API que contem o basico para o inicio de um projeto.

![GitHub](https://img.shields.io/github/license/diogofelizardo/Admin-react-init-project)

Essa API contem o login utilizando JWT (JSON Web Token), o cadastro de usuário simples com nome, email e senha, permissões de ADMIN ou USER e trabalha com banco de dados postgres.

<a href="https://www.buymeacoffee.com/ucGBgdf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/arial-violet.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

## Instalação

OS X & Linux OR Windows:

```sh
> cd /Api-nodejs-init-project
> yarn
```

## Configuração para Desenvolvimento

Feito a instalação com o yarn, só o que precisamos fazer agora é setar os arquivos de configuração:

 1. Dentro do arquivo ~/src/config/auth.js.
```nodejs
export  default {
  secret:  '698dc19d489c4e4db73e28a713eab07b', // Random String MD5
  expiresIn:  '1d' // Quantidade de Tempo para Expirar o Token
};
```
 2. Dentro do arquivo ~/src/config/database.js.

```nodejs
module.exports  = {
  username:  "root", // Usuário do Banco de Dados
  password:  "password", // Senha do Banco de Dados
  database:  "dbname", // Nome do Banco de Dados
  host:  "127.0.0.1", // Ip da maquina que esta rodando Banco de Dados
  dialect:  "postgres",
  define: {
    timestamps:  true,
    underscored:  true,
    underscoredAll:  true
  }
};
```
## Utilização
Depois de instalado e configurado agora só falta mais alguns passos para se utilizar a API.

 1. Abra o terminal e entre na pasta do projeto
 2. Execute o comando
```sh
> yarn dev
```
 3. Abra o browser na url http://localhost:3333/api se tudo tiver configurado corretamente irá aparecer como a imagem abaixo:
 
![browser](https://github.com/diogofelizardo/Api-nodejs-init-project/blob/master/browser.png)

## Histórico de lançamentos
* 0.0.1
    * Versão inicial

## Meta

Diogo Felizardo – [@DiogoFelizardo](https://twitter.com/...) – felizardo.diogo@gmail.com

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

[https://github.com/diogofelizardo](https://github.com/diogofelizardo/)

## Contribuição

1. Faça o _fork_ do projeto (<https://github.com/diogofelizardo/Api-nodejs-init-project/fork>)
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/new`)
3. Faça o _commit_ (`git commit -am 'Add some new Feature'`)
4. _Push_ (`git push origin feature/new`)
5. Crie um novo _Pull Request_
