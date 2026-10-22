
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const quantidadeDespesas = despesas.length;

  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + Number(item.amount);
  }, 0);

  const ultrapassouLimite = somaDespesas > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>
        {periodo}
      </Text>

      <Text style={styles.quantidade}>
        {quantidadeDespesas} {quantidadeDespesas === 1
          ? 'despesa'
          : 'despesas'}
      </Text>

      <Text
        style={[
          styles.valor,
          ultrapassouLimite && styles.valorAlto,
        ]}
      >
        R$ {somaDespesas.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8EAF6',
    padding: 20,
    margin: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  periodo: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 6,
    fontWeight: '600',
  },
  quantidade: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  valor: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#351401',
  },
  valorAlto: {
    color: '#DC2626',
  },
});
