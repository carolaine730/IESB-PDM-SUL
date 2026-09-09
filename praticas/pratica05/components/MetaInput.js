import {View, TextInput, Text, Pressable, StyleSheet} from "react-native";

export default function MetaInput({
  value,
  onChangeText,
  onAdd,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta..."
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        android_ripple={{ color: "#ffffff55" }}
        onPress={onAdd}
      >
        <Text style={styles.textoBotao}>
          Adicionar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },

  botao: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});