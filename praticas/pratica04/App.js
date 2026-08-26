import React from "react";
import {View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT,LIST_TITLE } from "./labels";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Aprendizado de Máquina',
  'Métricas e Arquitetura de Software',
  'Banco de Dados',
];

export default function App(){

  return(
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style= {styles.title}>{APP_TITLE}</Text>
        </View>


        <View style={styles.inputRow}>
         <TextInput style={styles.input} placeholder= {INPUT_PLACEHOLDER}/>

          <View style={styles.buttonContainer}>
            <Button title={BUTTON_TEXT} onPress={() => {}}/>
          </View>
        </View>
        
        <View style= {styles.listContainer}>
          <Text style= {styles.listTitle}>{LIST_TITLE}</Text>

          {disciplinas.map((disciplina, index) => (
            <View key= {index} style={styles.listItem}> 
               <Text style= {styles.itemText}> 
              {disciplina}
              </Text>
             </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )

}


const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 20,
  backgroundColor:'#f5f5f5',
},

header: {
  alignItems: 'center',
  marginBottom: 30,
},

title: {
  fontSize: 26,
  fontWeight: 'bold',
},

inputRow: { 
flexDirection: 'row',
justifyContent: 'space-between', //Distribui o espaço entre o campo e o botão
alignItems: 'center', //Mantém o input e o botão alinhados verticalmente
marginBottom: 30,
},

input:{
  width: '70%',
  borderWidth: 1,
  borderColor: '#999',
  borderRadius: 8,
  padding: 12,
  backgroundColor: '#ffffff'
},

buttonContainer:{
  width: '28%',
},

listContainer: {
  flex: 1,
},

listTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 15,
},

listItem: {
  marginBottom: 10,
  padding: 15,
  backgroundColor: '#ffffff',
  borderRadius: 8,
},

itemText: {
  fontSize: 16,
},

});





