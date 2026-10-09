import { View, Text, TextInput, StyleSheet } from "react-native";

import { useState } from "react";

function GerenciarDespesas() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>

        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>

        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={setValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>

        <TextInput style={styles.input} value={data} onChangeText={setData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },

  inputContainer: {
    marginVertical: 4,
    marginHorizontal: 16,
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
});

export default GerenciarDespesas;
