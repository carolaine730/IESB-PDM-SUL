# Prática 05 — MetasSemestre

Atividade desenvolvida para a disciplina de Programação para Dispositivos Móveis.

Professor: Marcelo Alves Farias  
Instituição: IESB

## Objetivo

Desenvolver um aplicativo de metas acadêmicas utilizando React Native e Expo.

Foram utilizados:

- useState
- props
- componentização
- Pressable
- useEffect
- AsyncStorage
- FlatList
- SafeAreaView

## Funcionalidades

- Adicionar metas acadêmicas;
- Impedir metas vazias;
- Exibir Alert quando o campo estiver vazio;
- Remover metas;
- Exibir a data de criação;
- Salvar as metas com AsyncStorage;
- Recuperar as metas ao abrir novamente o aplicativo.

## Componentização

O projeto possui dois componentes na pasta components:

### MetaInput.js

Responsável pelo campo de texto e botão para adicionar uma nova meta.

Props utilizadas:

- value
- onChangeText
- onAdd

### MetaList.js

Responsável pela exibição das metas utilizando FlatList.

Props utilizadas:

- metas
- onDelete


## Carregamento

O primeiro useEffect do App.js é executado quando o aplicativo abre.

Ele utiliza:

AsyncStorage.getItem(STORAGE_KEY)

e JSON.parse para recuperar as metas salvas.

##Salvamento

O segundo useEffect é executado sempre que a lista de metas muda.

Ele utiliza:

JSON.stringify(metas)

e:

AsyncStorage.setItem(STORAGE_KEY, metasJSON)

A variável carregando evita que uma lista vazia seja salva antes do carregamento inicial.


A remoção das metas é feita utilizando filter pelo id.

## Persistência com AsyncStorage

A chave utilizada é:

```javascript
const STORAGE_KEY = "@metas_semestre";