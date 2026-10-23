# Gerenciador de Despesas

## Descrição

Aplicativo desenvolvido em React Native com Expo para gerenciamento de despesas pessoais.

O projeto permite cadastrar, visualizar, editar e filtrar despesas por categoria, utilizando componentes reutilizáveis e gerenciamento de estado com React Hooks.

Atividade prática da disciplina de Programação para Dispositivos Móveis.

## Funcionalidades

- Cadastro de despesas com descrição, valor, data e categoria.
- Edição de despesas existentes.
- Visualização de todas as despesas cadastradas.
- Visualização de despesas recentes (últimos 7 dias).
- Filtro dinâmico por categoria.
- Cálculo automático do total de despesas.
- Validação de campos obrigatórios.
- Validação de valores monetários com até duas casas decimais.
- Seleção de datas por calendário.
- Destaque visual do total quando ultrapassa R$ 200,00.

## Tecnologias utilizadas

- React Native
- Expo SDK 46
- JavaScript
- React Hooks (`useState`)
- React Navigation
- `@react-native-community/datetimepicker`
- `FlatList`
- `StyleSheet`

## Conceitos aplicados

**useState:** gerenciamento dos dados das despesas e dos estados do formulário.

**.reduce():** cálculo da soma dos valores das despesas.

**.filter():** filtragem das despesas por categoria e período.

**.map():** renderização das categorias e atualização de despesas existentes.

**FlatList:** exibição eficiente das despesas cadastradas.

**Regex:** validação de valores monetários com até duas casas decimais.

**Props:** comunicação e compartilhamento de dados entre componentes.

## Estrutura do projeto

```text
Gerenciador-despesas/
├── assets/
├── src/
│   ├── components/
│   │   └── despesa/
│   │       ├── DespesaItem.js
│   │       ├── DespesaLista.js
│   │       ├── DespesaSaida.js
│   │       ├── DespesaSumario.js
│   │       └── SeletorData.js
│   └── screens/
│       ├── TodasDespesas.js
│       ├── DespesasRecentes.js
│       └── GerenciarDespesa.js
├── App.js
├── app.json
└── package.json
```

## Como executar

1. Acesse a pasta do projeto:

```bash
cd praticas/Gerenciador-despesas
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o Expo:

```bash
npx expo start
```

4. Abra o aplicativo no emulador Android.

## Evidências de funcionamento

As capturas de tela estão disponíveis na pasta `prints/`.

As evidências demonstram a listagem de despesas, o filtro por categoria, o cadastro, a edição, a seleção de datas e o cálculo dos totais.

## Observação

As despesas são armazenadas em memória durante a execução do aplicativo, utilizando `useState`. Ao reiniciar, os dados retornam aos exemplos iniciais.

## Atividade acadêmica

Projeto desenvolvido para aplicar os conceitos de componentização, gerenciamento de estado, manipulação de arrays, formulários, validação e renderização de listas em React Native.
