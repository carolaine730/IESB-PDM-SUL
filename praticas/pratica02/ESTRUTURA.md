## Package.json
- Funciona como um manifesto do projeto, contendo informações
sobre o projeto, suas dependências, scripts, metadados e outras
configurações.
- Metadados do Projeto:
• "name": Nome do projeto.
• "version": Versão do projeto.
• "description": Breve descrição do projeto.
• "author": Nome do autor.
• "license": Licença do projeto.


##  package-lock.json
- O arquivo package-lock.json é um arquivo gerado automaticamente
pelo npm (Node Package Manager) quando você instala ou atualiza
pacotes em um projeto Node.js.
- Ele serve como um bloqueio de versão das dependências, garantindo
que todos os desenvolvedores do projeto utilizem exatamente as
mesmas versões dos pacotes instalados.


## Package.json
- Dependências:
• "dependencies": Lista de pacotes necessários para rodar o projeto.
• "devDependencies": Pacotes usados apenas em desenvolvimento (testes,
build, linting).

- Scripts:
• Define comandos customizados para rodar tarefas comuns, como iniciar um
servidor ou rodar testes.

## Package.json
- Configurações do Projeto:
• "main": Arquivo principal do projeto (padrão: "index.js").
• "type": Define o módulo do projeto (pode ser "module" para ES Modules ou
"commonjs").
• "engines": Define a versão do Node.js compatível.


## App.js
- É um arquivo de configuração utilizado principalmente em
plataformas de deploy e automação, como Heroku, Expo (React
Native) e algumas ferramentas de infraestrutura como código.
- Ele contém metadados e configurações do aplicativo para facilitar sua
implantação e execução.


## assets/
- A pasta assets/ é comumente usada em projetos de desenvolvimento
para armazenar recursos estáticos (arquivos que não mudam
dinamicamente no código).
- Ela pode aparecer em diferentes tipos de projetos, como web, mobile
e back-end, com finalidades variadas.

## node_modules
-  É onde o Node.js armazena todas as dependências do projeto.
- Sempre que você executa npm install, os pacotes definidos no
package.json são baixados e armazenados dentro dela.

## .gitignore
-  é um arquivo usado pelo Git para especificar quais arquivos e
diretórios devem ser ignorados e não devem ser versionados no
repositório.
- Ele é essencial para evitar que arquivos desnecessários ou sensíveis
sejam enviados para o GitHub, GitLab ou qualquer outro sistema de
controle de versão.

## .expo
-  A pasta .expo/ é criada automaticamente pelo Expo, uma plataforma
para desenvolvimento de aplicativos React Native.
- Ela contém arquivos temporários e metadados usados pelo Expo para
gerenciar e rodar o projeto.