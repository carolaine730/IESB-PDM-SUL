
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../../store/theme-context';

export default function DespesaSumario({
  despesas,
  periodo,
}) {
  const { colors } = useTheme();

  const quantidadeDespesas = despesas.length;

  const somaDespesas = despesas.reduce(
    (acumulador, item) =>
      acumulador + Number(item.amount),
    0
  );

  const ultrapassouLimite = somaDespesas > 200;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.summary,
        },
      ]}
    >
      <Text
        style={[
          styles.periodo,
          { color: colors.text },
        ]}
      >
        {periodo}
      </Text>

      <Text
        style={[
          styles.quantidade,
          { color: colors.textSecondary },
        ]}
      >
        {quantidadeDespesas}{' '}
        {quantidadeDespesas === 1
          ? 'despesa'
          : 'despesas'}
      </Text>

      <Text
        style={[
          styles.valor,
          {
            color: ultrapassouLimite
              ? colors.danger
              : colors.text,
          },
        ]}
      >
        R$ {somaDespesas.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  periodo: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },

  quantidade: {
    fontSize: 14,
    marginBottom: 8,
  },

  valor: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
