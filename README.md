# Teste pratico
## Tecnologias utilizadas
- ReactJS
- ContextAPI
- Typescript
- Javascript
- express
- SQlite
- SASS

### Como instalar (React)

* Para baixar o projeto siga as instruções abaixo:

```
1. git clone https://github.com/CaioVieira-dev/teste-pratico.git
2. cd teste-pratico
```

* Instale as dependências do projeto:

```
3. yarn install
ou
3. npm install
```
* Inicie o servidor

```
4. yarn run server
ou
4. npm run server

```
* Inicie a aplicação

```
5. yarn start
ou
5. npm start
```

# Sobre o projeto
- As rotas desprotegidas são a '/' e '/login'
- A rota protegida é a '/admin'
- A pagina de login pode adicionar novos 'usuários'
- A pagina de administrador pode adicionar novos 'administradores'
- A pagina de administrador pode cadastrar, editar ou deletar aulas e módulos
- Ambas as paginas das rotas '/' e '/admin' podem ver todas as aulas e módulos
- Clicar no card de módulo revela as aulas cadastradas no mesmo
- Como administrador, clicar em uma engrenagem mostra as opções de edição e deletar do módulo ou aula.
- Um usuário administrador pré-cadastrado é *'admin@gmail.com'* senha *'123456'*
- Toda requisição de alteração de módulo ou aula é protegida com uma verificação de token de autenticação e uma validação adicional no backend de função do usuário (administrador ou usuário)
- A pagina utiliza o express no backend e o axios para lidar com as requisições. As rotas da api do backend estão no arquivo 'src/routes.js'
