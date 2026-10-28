import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const options = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(options);

  return result.canceled ? null : result.assets[0].uri;
}

export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permissão da câmera',
      'Permita o acesso à câmera nos ajustes para tirar uma foto.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abrir ajustes',
          onPress: async () => {
            try {
              await Linking.openSettings();
            } catch {
              Alert.alert('Erro', 'Não foi possível abrir os ajustes.');
            }
          },
        },
      ]
    );

    return null;
  }

  const result = await ImagePicker.launchCameraAsync(options);

  return result.canceled ? null : result.assets[0].uri;
}