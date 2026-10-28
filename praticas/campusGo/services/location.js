import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (!permission.granted) {
    return null;
  }

  const enabled = await Location.hasServicesEnabledAsync();

  if (!enabled) {
    throw new Error('Ative a localização do aparelho e tente novamente.');
  }

  const position = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.High,
});

  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const address = addresses[0];

    if (address) {
      const street = [address.street, address.streetNumber]
        .filter(Boolean)
        .join(', ');

      const formattedAddress = [
        street,
        address.district,
        address.city || address.subregion,
        address.region,
      ]
        .filter(Boolean)
        .join(' - ');

      if (formattedAddress) {
        label = formattedAddress;
      }
    }
  } catch {
    // Se o endereço não estiver disponível, mostra as coordenadas.
  }

  return { latitude, longitude, label };
}