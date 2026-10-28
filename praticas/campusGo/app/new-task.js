import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function NewTaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.description}>
        Organize aqui sua próxima atividade do campus.
      </Text>

      <Button title="Fechar" onPress={() => router.back()} />
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
});