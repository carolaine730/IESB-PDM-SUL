
import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { useTheme } from '../../store/theme-context';

export default function DespesaSaida({
  despesas,
  periodo,
  onSelecionarDespesa,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <DespesaSumario
        despesas={despesas}
        periodo={periodo}
      />

      <DespesaLista
        despesas={despesas}
        onSelecionarDespesa={onSelecionarDespesa}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
