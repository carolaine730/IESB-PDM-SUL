
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesas from "./screens/GerenciarDespesas";
import TodasDespesas from "./screens/TodasDespesas";
import IconButton from "./components/IconButton";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="add"
              size={24}
              color="black"
              onPress={() => {
                navigation.navigate("GerenciarDespesas");
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="DespesasRecentes"
          component={DespesasRecentes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="hourglass"
                size={size}
                color={color}
              />
            ),
            tabBarLabel: "Recentes",
            title: "Despesas Recentes",
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        />

        <Tab.Screen
          name="TodasDespesas"
          component={TodasDespesas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="wallet-outline"
                size={size}
                color={color}
              />
            ),
            tabBarLabel: "Todas",
            title: "Todas as Despesas",
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          component={BottomTabScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="GerenciarDespesas"
          component={GerenciarDespesas}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}