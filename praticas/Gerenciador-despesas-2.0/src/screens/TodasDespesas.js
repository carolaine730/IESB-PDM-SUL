import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

import DespesaSaida from "../components/despesa/DespesaSaida";
import { Ionicons } from "@expo/vector-icons";
import { useExpenses } from "../store/expenses-context";

const CATEGORIAS = ["Todas", "Alimentação", "Transporte", "Lazer", "Contas"];

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const despesasFiltradas = expenses.filter(
    (expense) =>
      categoriaSelecionada === "Todas" ||
      expense.category === categoriaSelecionada,
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Todas as Despesas</Text>

        <Pressable
          style={styles.botaoAdicionar}
          onPress={() => navigation.navigate("GerenciarDespesa")}
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </Pressable>
      </View>

      <Text style={styles.subtitulo}>Filtrar por categoria:</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
        contentContainerStyle={styles.filtrosConteudo}
      >
        {CATEGORIAS.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() => setCategoriaSelecionada(categoria)}
            style={[
              styles.botaoFiltro,
              categoriaSelecionada === categoria && styles.botaoSelecionado,
            ]}
          >
            <Text
              style={[
                styles.textoFiltro,
                categoriaSelecionada === categoria && styles.textoSelecionado,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={
          categoriaSelecionada === "Todas"
            ? "Total de Despesas"
            : `Total - ${categoriaSelecionada}`
        }
        onSelecionarDespesa={(id) =>
          navigation.navigate("GerenciarDespesa", {
            expenseId: id,
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#351401",
  },
  subtitulo: {
    fontSize: 15,
    fontWeight: "600",
    marginHorizontal: 15,
    marginBottom: 8,
    color: "#333333",
  },
  filtros: {
    flexGrow: 0,
    marginBottom: 10,
  },
  filtrosConteudo: {
    paddingHorizontal: 12,
    alignItems: "center",
    paddingVertical: 5,
  },
  botaoFiltro: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },
  botaoSelecionado: {
    backgroundColor: "#351401",
  },
  textoFiltro: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "500",
  },
  textoSelecionado: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
    position: "relative",
  },
  botaoAdicionar: {
    position: "absolute",
    right: 15,
    backgroundColor: "#351401",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
});
