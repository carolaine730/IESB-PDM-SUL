
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ despesas, navigation }) {

  const hoje = new Date();
  const dataLimite = new Date();
  dataLimite.setHours(0, 0, 0, 0);
  dataLimite.setDate(dataLimite.getDate() - 6);

  const despesasRecentes = despesas.filter((despesa) => {
    const partes = despesa.data.split('-').map(Number);
    const dataDespesa = new Date(
      partes[0],
      partes[1] - 1,
      partes[2]
    );

    return dataDespesa >= dataLimite && dataDespesa <= hoje;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Despesas Recentes
      </Text>

      <DespesaSaida
        despesas={despesasRecentes}
        periodo="Últimos 7 dias"
        onSelecionarDespesa={(id) =>
          navigation.navigate('GerenciarDespesa', { id })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#351401',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
});
