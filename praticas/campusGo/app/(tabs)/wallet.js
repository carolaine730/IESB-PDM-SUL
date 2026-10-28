import {
  Alert,
  Button,
  FlatList,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, isLoaded } = useExpenses();

  const total = expenses.reduce(
    (sum, expense) => sum + (Number(expense.amount) || 0),
    0
  );

  async function shareSummary() {
    try {
      await Share.share({
        message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível compartilhar o resumo.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu bolso</Text>

      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>

      <Button
        title="Compartilhar resumo"
        onPress={shareSummary}
        disabled={!isLoaded}
      />

      <FlatList
        style={styles.list}
        data={expenses}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.expenseTitle}>
              {item.description || item.title || 'Despesa'}
            </Text>
            <Text>
              R$ {(Number(item.amount) || 0).toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {isLoaded
              ? 'Nenhuma despesa cadastrada.'
              : 'Carregando despesas...'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  total: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
    marginVertical: 24,
  },
  list: {
    marginTop: 24,
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  empty: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 24,
  },
});