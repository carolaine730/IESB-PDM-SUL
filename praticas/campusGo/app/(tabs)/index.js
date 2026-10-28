import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FadeIn from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.status}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Não foi possível carregar o mural
        </Text>

        <Text style={styles.errorMessage}>{error}</Text>

        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Mural de avisos</Text>
          <Text style={styles.subtitle}>
            Acompanhe as novidades do campus.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <FadeIn style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Nenhum aviso disponível. Puxe para atualizar.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 23,
    color: '#475569',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  status: {
    marginTop: 16,
    color: '#64748b',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#b91c1c',
    marginBottom: 12,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#475569',
    marginBottom: 24,
  },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 32,
  },
});