import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const icons = {
  index: 'home-outline',
  tasks: 'checkbox-outline',
  wallet: 'wallet-outline',
  profile: 'person-circle-outline',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={icons[route.name] || 'ellipse-outline'}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}