import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';
import React from "react";


function MetaInput (props){

const [inputMetaText, setInputMetaText] = useState('');

function metaInputHandledler (inputText){
  setInputMetaText(inputText)
};

function addMetaHandler(){
    props.onAddMeta(inputMetaText);
    setInputMetaText('');
}
    return(

<View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
        <View style={{width:'65%'}}>
        <TextInput style={styles.inputText} placeholder={ rotulo_input_meta} onChangeText={metaInputHandledler}/>
        </View>
      <View style={{width:'30%'}}>
        <Button title={rotulo_btn_cadastro_meta} onPress={adicionarMetaHandler}/>
        <View style={{width:'30%'}}>
            <Button title={rotulo_btn_cadastro_meta} onPress={addMetaHandler}/>
        </View>
      </View>
      </View>

    );
}

export default MetaInput;

const styles= StyleSheet.create({
    inputText:{
        borderColor: '#ccccc',
        borderWidth: 1
    }
});