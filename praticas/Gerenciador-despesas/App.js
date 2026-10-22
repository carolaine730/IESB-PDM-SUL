import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TodasDespesas from "./src/screens/TodasDespesas";
import DespesasRecentes from "./src/screens/DespesasRecentes";
import GerenciarDespesa from "./src/screens/GerenciarDespesa";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DESPESAS_INICIAIS = [
  {
    id: "1",
    descricao: "Supermercado",
    valor: 150,
    data: "2026-10-20",
    categoria: "Alimentação",
  },
  {
    id: "2",
    descricao: "Combustível",
    valor: 80,
    data: "2026-10-19",
    categoria: "Transporte",
  },
  {
    id: "3",
    descricao: "Cinema",
    valor: 45,
    data: "2026-10-18",
    categoria: "Lazer",
  },
  {
    id: "4",
    descricao: "Conta de energia",
    valor: 120,
    data: "2026-10-17",
    categoria: "Contas",
  },
];

function NavegacaoAbas({ despesas }) {
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
        tabBarActiveTintColor: "#351401",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Recentes">
        {(props) => <DespesasRecentes {...props} despesas={despesas} />}
      </Tab.Screen>

      <Tab.Screen name="Todas">
        {(props) => <TodasDespesas {...props} despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(novaDespesa) {
    setDespesas((despesasAtuais) => [novaDespesa, ...despesasAtuais]);
  }

  function editarDespesa(despesaAtualizada) {
    setDespesas((despesasAtuais) =>
      despesasAtuais.map((despesa) =>
        despesa.id === despesaAtualizada.id ? despesaAtualizada : despesa,
      ),
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" options={{ headerShown: false }}>
          {(props) => <NavegacaoAbas {...props} despesas={despesas} />}
        </Stack.Screen>

        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: "Gerenciar Despesa" }}
        >
          {(props) => (
            <GerenciarDespesa
              {...props}
              adicionarDespesa={adicionarDespesa}
              editarDespesa={editarDespesa}
              despesas={despesas}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
