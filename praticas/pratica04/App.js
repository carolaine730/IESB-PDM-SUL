
import React, { useState } from "react";
import {View, Text, TextInput, Pressable, Switch, StyleSheet,} from "react-native";
import {APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE,} from "./labels";
import {SafeAreaProvider, SafeAreaView,} from "react-native-safe-area-context";

const disciplinas = [
  "Programação para Dispositivos Móveis",
  "Aprendizado de Máquina",
  "Métricas e Arquitetura de Software",
  "Banco de Dados",
];

export default function App() {

  const [somenteObrigatorias, setSomenteObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>
            {APP_TITLE}
          </Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
          />
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {BUTTON_TEXT}
            </Text>
          </Pressable>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            Mostrar apenas obrigatórias
          </Text>
          <Switch
            value={somenteObrigatorias}
            onValueChange={setSomenteObrigatorias}
          />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            {LIST_TITLE}
          </Text>
          {disciplinas.map((disciplina, index) => (
            <View
              key={index}
              style={styles.listItem}
            >
              <Text style={styles.itemText}>
                {disciplina}
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribui o espaço entre o campo e o botão.
    alignItems: "center", // Mantém o input e o botão alinhados verticalmente.
    marginBottom: 20,
  },

  input: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
  },

  button: {
    width: "28%",
    paddingVertical: 13,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Coloca o texto de um lado e o Switch do outro.
    alignItems: "center", // Mantém texto e Switch alinhados verticalmente.
    marginBottom: 30,
  },

  switchText: {
    fontSize: 16,
  },

  listContainer: {
    flex: 1,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  listItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },

  itemText: {
    fontSize: 16,
  },
});
