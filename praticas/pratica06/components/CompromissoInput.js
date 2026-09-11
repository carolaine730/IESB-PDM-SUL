import {View, TextInput, Text, Pressable, StyleSheet} from "react-native";

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholder}
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
          {labels.botao}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    width: "68%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  botao: {
    width: "28%",
    backgroundColor: "#2563eb",
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