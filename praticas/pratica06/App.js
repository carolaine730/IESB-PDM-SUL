import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CompromissoInput from "./components/CompromissoInput";
import CompromissoList from "./components/CompromissoList";
import { tituloApp, placeholderCompromisso, botaoAdicionar, tituloLista, listaVazia } from "./labels";

const STORAGE_KEY = "@rotina_iesb_compromissos";

export default function App() {
  const [texto, setTexto] = useState("");
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // CARREGAR COMPROMISSOS
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos !== null) {
          const dadosConvertidos =
            JSON.parse(dadosSalvos);

          setCompromissos(dadosConvertidos);
        }
      } catch (erro) {
        Alert.alert(
          "Erro",
          "Não foi possível carregar seus compromissos."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarCompromissos();
  }, []);

  // SALVAR COMPROMISSOS
  useEffect(() => {
    async function salvarCompromissos() {
      try {
        const dadosJSON =
          JSON.stringify(compromissos);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          dadosJSON
        );
      } catch (erro) {
        Alert.alert(
          "Erro",
          "Não foi possível salvar seus compromissos."
        );
      }
    }

    if (!carregando) {
      salvarCompromissos();
    }
  }, [compromissos, carregando]);

  function adicionarCompromisso() {
    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      Alert.alert(
        "Compromisso inválido",
        "Digite um compromisso antes de adicionar."
      );

      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
    };

    setCompromissos((compromissosAtuais) => [
      ...compromissosAtuais,
      novoCompromisso,
    ]);

    setTexto("");
  }

  function removerCompromisso(id) {
    setCompromissos((compromissosAtuais) =>
      compromissosAtuais.filter(
        (compromisso) => compromisso.id !== id
      )
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("./assets/logo_iesb.png")}
              style={styles.logo}
            />

            <Text style={styles.titulo}>
              {tituloApp}
            </Text>
          </View>

          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarCompromisso}
            labels={{
              placeholder: placeholderCompromisso,
              botao: botaoAdicionar,
            }}
          />

          <CompromissoList
            itens={compromissos}
            onDelete={removerCompromisso}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 12,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222222",
  },
});