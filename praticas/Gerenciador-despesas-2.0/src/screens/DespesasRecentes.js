
import React from 'react';

import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../store/theme-context';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const { isDark, colors } = useTheme();

  // Considera os últimos 7 dias, incluindo hoje
  const hoje = new Date();

  const dataLimite = new Date();
  dataLimite.setHours(0, 0, 0, 0);
  dataLimite.setDate(dataLimite.getDate() - 6);

  const despesasRecentes = expenses.filter((expense) => {
    if (!expense.date) return false;

    const [ano, mes, dia] = expense.date
      .split('-')
      .map(Number);

    const dataDespesa = new Date(ano, mes - 1, dia);

    return (
      dataDespesa >= dataLimite &&
      dataDespesa <= hoje
    );
  });

  function abrirEdicao(id) {
    navigation.navigate('GerenciarDespesa', {
      expenseId: id,
    });
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <Text
        style={[
          styles.titulo,
          { color: colors.text },
        ]}
      >
        Despesas Recentes
      </Text>

      <DespesaSaida
        despesas={despesasRecentes}
        periodo="Últimos 7 dias"
        onSelecionarDespesa={abrirEdicao}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight || 0
        : 0,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
});
