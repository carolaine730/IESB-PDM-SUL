import { useState } from "react";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCurrentPlace } from "../../services/location";
import { scheduleReminder } from "../../services/notifications";

export default function TasksScreen() {
  const [place, setPlace] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  async function checkIn() {
    setIsLocating(true);

    try {
      const currentPlace = await getCurrentPlace();

      if (!currentPlace) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à localização para registrar onde você estudou.",
        );
        return;
      }

      setPlace(currentPlace);
      Alert.alert("Check-in realizado", currentPlace.label);
    } catch (error) {
      Alert.alert(
        "Não foi possível obter a localização",
        error instanceof Error
          ? error.message
          : "Tente novamente em instantes.",
      );
    } finally {
      setIsLocating(false);
    }
  }

  async function remindMe() {
    setIsScheduling(true);

    try {
      const id = await scheduleReminder("Lembrete CampusGo", 10);

      if (!id) {
        Alert.alert(
          "Permissão necessária",
          "Permita as notificações nos ajustes do Expo Go para receber lembretes.",
        );
        return;
      }

      Alert.alert(
        "Lembrete agendado",
        "Você será lembrado em cerca de 10 segundos.",
      );
    } catch (error) {
      Alert.alert(
        "Erro ao agendar lembrete",
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setIsScheduling(false);
    }
  }

  async function completeTask() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // A falta de vibração não impede a conclusão.
    }

    Alert.alert("Tarefa concluída");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Minhas tarefas</Text>

      <View style={styles.button}>
        <Button title="Nova tarefa" onPress={() => router.push("/new-task")} />
      </View>

      <View style={styles.button}>
        <Button
          title="Abrir tarefa 42"
          onPress={() => router.push("/task/42")}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meu local de estudo</Text>

        <Text style={styles.description}>Registre onde você estudou hoje.</Text>

        <Button
          title={isLocating ? "Buscando localização..." : "Estudei aqui"}
          onPress={checkIn}
          disabled={isLocating}
        />

        {isLocating && (
          <ActivityIndicator color="#2563eb" style={styles.loading} />
        )}

        {place && <Text style={styles.place}>{place.label}</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ações da tarefa</Text>

        <View style={styles.button}>
          <Button
            title={isScheduling ? "Agendando..." : "Lembrar em 10 s"}
            onPress={remindMe}
            disabled={isScheduling}
          />
        </View>

        <Button title="Concluir" onPress={completeTask} color="#15803d" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
  },
  loading: {
    marginTop: 16,
  },
  place: {
    fontSize: 16,
    lineHeight: 24,
    color: "#166534",
    marginTop: 20,
  },
});
