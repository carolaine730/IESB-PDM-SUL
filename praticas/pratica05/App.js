import {StyleSheet, View, Text, Image, Alert} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaProvider,SafeAreaView,} from "react-native-safe-area-context";
import MetaInput from "./components/MetaInput";
import MetaList from "./components/MetaList";

const STORAGE_KEY = "@metas_semestre";

export default function App() {
  const [textoMeta, setTextoMeta] = useState("");
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // CARREGAR AS METAS
  useEffect(() => {
    async function carregarMetas() {
      try {
        const metasSalvas =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (metasSalvas !== null) {
          const metasConvertidas =
            JSON.parse(metasSalvas);

          setMetas(metasConvertidas);
        }
      } catch (erro) {
        Alert.alert(
          "Erro",
          "Não foi possível carregar suas metas."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  // SALVAR AS METAS
  useEffect(() => {
    async function salvarMetas() {
      try {
        const metasJSON =
          JSON.stringify(metas);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          metasJSON
        );
      } catch (erro) {
        Alert.alert(
          "Erro",
          "Não foi possível salvar suas metas."
        );
      }
    }

    if (!carregando) {
      salvarMetas();
    }
  }, [metas, carregando]);

  function adicionarMetaHandler() {
    if (textoMeta.trim() === "") {
      Alert.alert(
        "Meta inválida",
        "Digite uma meta antes de adicionar."
      );

      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoMeta.trim(),
      criadaEm: new Date().toISOString(),
    };

    setMetas((metasAtuais) => [
      ...metasAtuais,
      novaMeta,
    ]);

    setTextoMeta("");
  }

  function removerMetaHandler(id) {
    setMetas((metasAtuais) =>
      metasAtuais.filter(
        (meta) => meta.id !== id
      )
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Image
              source={require("./assets/icon.png")}
              style={styles.logo}
            />

            <View>
              <Text style={styles.titulo}>
                Metas do Semestre
              </Text>

              <Text style={styles.subtitulo}>
                Organize seus objetivos acadêmicos
              </Text>
            </View>
          </View>

          <MetaInput
            value={textoMeta}
            onChangeText={setTextoMeta}
            onAdd={adicionarMetaHandler}
          />

          <MetaList
            metas={metas}
            onDelete={removerMetaHandler}
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

  subtitulo: {
    fontSize: 14,
    color: "#777777",
    marginTop: 3,
  },
});