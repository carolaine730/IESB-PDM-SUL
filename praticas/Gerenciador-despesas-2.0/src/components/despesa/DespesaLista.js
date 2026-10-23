
import React from 'react';

import {
  FlatList,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DespesaItem from './DespesaItem';
import { useTheme } from '../../store/theme-context';

export default function DespesaLista({
  despesas,
  onSelecionarDespesa,
}) {
  const { colors } = useTheme();

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

  function renderizarListaVazia() {
    return (
      <View style={styles.containerVazio}>
        <Ionicons
          name="receipt-outline"
          size={64}
          color={colors.textSecondary}
        />

        <Text
          style={[
            styles.tituloVazio,
            { color: colors.text },
          ]}
        >
          Nenhuma despesa encontrada
        </Text>

        <Text
          style={[
            styles.textoVazio,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Toque no botão + para adicionar uma nova despesa.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={despesas}
      renderItem={renderizarDespesa}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={renderizarListaVazia}
      contentContainerStyle={[
        styles.lista,
        despesas.length === 0 &&
          styles.listaVazia,
      ]}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingVertical: 10,
    flexGrow: 1,
  },

  listaVazia: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerVazio: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  tituloVazio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },

  textoVazio: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
});
