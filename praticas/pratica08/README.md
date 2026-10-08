# Atividade Screen

Aplicativo desenvolvido em React Native com Expo para praticar navegação entre telas utilizando React Navigation.

## Objetivo

Construir a estrutura de navegação de um aplicativo de controle de despesas utilizando:

- Bottom Tabs
- Native Stack
- React Navigation
- Ionicons
- Componente reutilizável com Pressable


## Telas
O aplicativo possui as seguintes telas:
- Despesas Recentes
- Todas as Despesas
- Gerenciar Despesa

## Navegação:
Utilizamos dois tipos de navegação:
- Bottom Tabs: é a navegação por abas que aparece normalmente na parte inferior do aplicativo. Neste projeto, ela permite alternar entre as telas Despesas Recentes e Todas as Despesas sem sair da área principal do app.

- Native Stack: é a navegação em pilha. Ela funciona como uma sequência de telas, em que uma nova tela é aberta por cima da anterior. Neste projeto, ela é usada para sair da área de Despesas e abrir a tela Gerenciar Despesa, permitindo também voltar para a tela anterior.

## Os componentes: 
Foi criado o componente reutilizável IconButton, utilizando:
- Pressable
- Ionicons
- Props:
  - icon
  - size
  - color
  - onPress

  ## Funcionalidades: 
  Ao clicar no botão com ícone de adição no cabeçalho, o usuario é direcionado para a tela (GerenciarDispesa) atraves da navegação: navigation.navigate('GerenciarDespesa')

  ## Tecnologias Utilizadas:
- React Native
- Expo
- React Navigation
- Bottom Tabs
- Native Stack
- Ionicons

## Estrutura do Projeto


```text
Atividade-screen/
├── components/
│   └── IconButton.js
├── screens/
│   ├── DespesasRecentes.js
│   ├── TodasDespesas.js
│   └── GerenciarDespesa.js
├── App.js
├── package.json
└── README.md
