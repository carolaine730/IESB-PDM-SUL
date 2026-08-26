import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Button, ScrollView } from 'react-native';
import {  rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens';
import { useState } from 'react';
import MetaList from '../componentes/MetaList';
import MetaInput from '../componentes/MetaInput';


export default function App() {


const [ metas, setMetas] = useState([]);

function adicionarMetaHandler(inputMeta){
  setMetas([...metas, inputMetaText]);
}

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler}/>
      <View style={styles.metaContainer}>
        <MetaList array={metas}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer:{
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },
  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  metaContainer: {
    flex: 2
  },
});
