import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

export default function CompromissoList({
  itens,
  onDelete,
  tituloLista,
  listaVazia,
}) {
  function renderizarItem({ item }) {
    return (
      <View style={styles.item}>
        <View style={styles.informacoes}>
          <Text style={styles.texto}>
            {item.texto}
          </Text>

          <Text style={styles.data}>
            Criado em:{" "}
            {new Date(
              item.criadoEm
            ).toLocaleString("pt-BR")}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.botaoExcluir,
            pressed && styles.botaoPressionado,
          ]}
          android_ripple={{
            color: "#ffffff55",
          }}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.textoExcluir}>
            Excluir
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {tituloLista}
      </Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          itens.length === 0
            ? styles.listaVaziaContainer
            : styles.lista
        }
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.listaVaziaTexto}>
              {listaVazia}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222222",
  },

  lista: {
    paddingBottom: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  informacoes: {
    flex: 1,
  },

  texto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },

  data: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
  },

  botaoExcluir: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: "hidden",
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoExcluir: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  listaVaziaContainer: {
    flexGrow: 1,
  },

  listaVazia: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listaVaziaTexto: {
    color: "#999999",
    fontSize: 15,
  },
});