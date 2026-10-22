
import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, onSelecionarDespesa }) {

  function renderizarDespesa({ item }) {
    return (
      <DespesaItem
        despesa={item}
        onPress={() => {
          if (onSelecionarDespesa) {
            onSelecionarDespesa(item.id);
          }
        }}
      />
    );
  }

  if (despesas.length === 0) {
    return (
      <View style={styles.containerVazio}>
        <Text style={styles.textoVazio}>
          Nenhuma despesa encontrada.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={despesas}
      renderItem={renderizarDespesa}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingVertical: 10,
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoVazio: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
  },
});
