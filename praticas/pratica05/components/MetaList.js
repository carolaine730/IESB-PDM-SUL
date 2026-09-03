import {View, Text, FlatList, Pressable, StyleSheet} from "react-native";

export default function MetaList({
  metas,
  onDelete,
}) {
  function renderizarMeta({ item }) {
    return (
      <View style={styles.item}>
        <View style={styles.informacoes}>
          <Text style={styles.textoMeta}>
            {item.texto}
          </Text>

          <Text style={styles.data}>
            Criada em:{" "}
            {new Date(
              item.criadaEm
            ).toLocaleDateString("pt-BR")}
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
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={renderizarMeta}
      contentContainerStyle={
        metas.length === 0
          ? styles.listaVaziaContainer
          : undefined
      }
      ListEmptyComponent={
        <View style={styles.listaVazia}>
          <Text style={styles.listaVaziaTitulo}>
            Nenhuma meta cadastrada
          </Text>

          <Text style={styles.listaVaziaTexto}>
            Adicione uma meta para começar.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
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

  textoMeta: {
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

  listaVaziaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555555",
  },

  listaVaziaTexto: {
    fontSize: 14,
    color: "#999999",
    marginTop: 5,
  },
});