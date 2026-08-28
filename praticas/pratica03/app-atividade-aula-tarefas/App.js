import { StyleSheet, View } from "react-native";
import { useState } from "react";
import MetaList from "./componentes/MetaList";
import MetaInput from "./componentes/MetaInput";

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = { id: Math.random().toString(), texto: inputMeta};
    setMetas([...metas, novaMeta]);
  }

  function deletarMetaHandle (id) {
    console.log(id);
    const novasMetas = metas.filter(meta => meta.id !== id);
    setMetas(novasMetas);
  }

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />

      <View style={styles.metaContainer}>
        <MetaList array={metas} 
        onDeleteItem={deletarMetaHandle}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
  },

  metaContainer: {
    flex: 10,
  },
});