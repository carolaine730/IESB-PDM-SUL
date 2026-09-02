import { View, TextInput, Button, StyleSheet } from "react-native";
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from "../mensagens";
import { useState } from "react";

function MetaInput(props) {
  const [inputMetaText, setInputMetaText] = useState("");

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function addMetaHandler() {
    if (inputMetaText.trim() === "") {
      return;
    }

    props.onAddMeta(inputMetaText);
    setInputMetaText("");
  }

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputArea}>
        <TextInput
          value={inputMetaText}
          onChangeText={metaInputHandler}
          style={styles.inputText}
          placeholder={rotulo_input_meta}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button
          onPress={addMetaHandler}
          title={rotulo_btn_cadastro_meta}
        />
      </View>
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },

  inputArea: {
    width: "65%",
  },

  buttonArea: {
    width: "30%",
  },

  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 8,
  },
});