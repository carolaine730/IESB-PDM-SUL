import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TodasDespesas from "./src/screens/TodasDespesas";
import DespesasRecentes from "./src/screens/DespesasRecentes";
import GerenciarDespesa from "./src/screens/GerenciarDespesa";

import {
  ExpensesContextProvider,
  useExpenses,
} from "./src/store/expenses-context";

import { useColorScheme } from "react-native";
import { COLORS } from "./src/constants/theme";
import { ThemeProvider, useTheme } from "./src/store/theme-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavegacaoAbas() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === "Recentes" ? "time-outline" : "wallet-outline"}
            size={size}
            color={color}
          />
        ),

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Recentes" component={DespesasRecentes} />
      <Tab.Screen name="Todas" component={TodasDespesas} />
    </Tab.Navigator>
  );
}

function NavegacaoPrincipal() {
  const { isLoaded } = useExpenses();

  // Aguarda o carregamento dos dados salvos
  if (!isLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          component={NavegacaoAbas}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GerenciarDespesa"
          component={GerenciarDespesa}
          options={{ title: "Nova despesa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ExpensesContextProvider>
        <NavegacaoPrincipal />
      </ExpensesContextProvider>
    </ThemeProvider>
  );
}
