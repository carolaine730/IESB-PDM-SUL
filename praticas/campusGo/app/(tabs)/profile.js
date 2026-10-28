import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const savedPhoto = await AsyncStorage.getItem(PHOTO_KEY);
        setPhoto(savedPhoto);
      } catch {
        Alert.alert('Erro', 'Não foi possível recuperar a foto.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPhoto();
  }, []);

  async function changePhoto(source) {
    if (isLoading || isBusy) {
      return;
    }

    setIsBusy(true);

    try {
      const uri = await source();

      if (uri) {
        await AsyncStorage.setItem(PHOTO_KEY, uri);
        setPhoto(uri);
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a foto.');
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => changePhoto(pickImage)}
        disabled={isLoading || isBusy}
        accessibilityRole="button"
        accessibilityLabel="Escolher foto de perfil na galeria"
        style={styles.avatarButton}
      >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <Ionicons
            name="person-circle-outline"
            size={140}
            color="#2563eb"
          />
        )}
      </Pressable>

      <Text style={styles.title}>Meu perfil</Text>
      <Text style={styles.description}>
        Toque na foto para escolher uma imagem da galeria.
      </Text>

      {(isLoading || isBusy) && (
        <ActivityIndicator
          color="#2563eb"
          style={styles.loading}
        />
      )}

      <View style={styles.button}>
        <Button
          title="Escolher da galeria"
          onPress={() => changePhoto(pickImage)}
          disabled={isLoading || isBusy}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Tirar foto"
          onPress={() => changePhoto(takePhoto)}
          disabled={isLoading || isBusy}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  avatarButton: {
    marginTop: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748b',
    marginTop: 12,
    marginBottom: 24,
  },
  loading: {
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
});