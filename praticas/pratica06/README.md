# RotinaIESB

Atividade Integradora desenvolvida para a disciplina de Programação para Dispositivos Móveis.

**Professor:** Marcelo Alves Farias  
**Instituição:** IESB  
**Aulas relacionadas:** 02, 03, 04, 05 e 06
**Aluna:** Carolaine Nunes Santos - 2514290034 

## Objetivo

O RotinaIESB é um aplicativo para organização da rotina acadêmica.

O aplicativo permite cadastrar compromissos, visualizar a lista, remover itens e manter os dados salvos mesmo após fechar e abrir o aplicativo novamente.


## Funcionalidades
- Adicionar compromissos;
- Validar campo vazio com Alert;
- Exibir data e hora de criação;
- Remover compromissos;
- Exibir a lista com FlatList;
- Utilizar Pressable com feedback visual;
- Salvar os dados com AsyncStorage;
- Recuperar os compromissos após reabrir o aplicativo.


## Arquivos criados
  # labels.js
- Contém os rótulos utilizados pelo aplicativo através de exports nomeados.

   # components/CompromissoInput.js
- Componente responsável pelo campo de texto e pelo botão de adicionar.

 # Props utilizadas:
- value
- onChangeText
- onAdd
- labels
- components/CompromissoList.js

  # Componente responsável pela exibição da lista de compromissos.

 # Props utilizadas:
- itens
- onDelete
- tituloLista
- listaVazia

## Persistência com AsyncStorage
- A chave utilizada para armazenamento é: 

(const STORAGE_KEY = "@rotina_iesb_compromissos";)

## useEffect de carregamento
O primeiro useEffect, localizado no App.js, é executado quando o aplicativo é iniciado.

## useEffect de salvamento
O segundo useEffect é executado sempre que a lista de compromissos é alterada.


## Criação do projeto

O projeto foi criado utilizando:

```bash
npx create-expo-app@latest . --template blank