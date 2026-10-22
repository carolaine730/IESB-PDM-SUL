import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DESPESAS_INICIAIS = [
  {
    id: '1',
    descricao: 'Supermercado',
    valor: 150,
    data: '2026-10-20',
    categoria: 'Alimentação',
  },
  {
    id: '2',
    descricao: 'Combustível',
    valor: 80,
    data: '2026-10-19',
    categoria: 'Transporte',
  },
  {
    id: '3',
    descricao: 'Cinema',
    valor: 45,
    data: '2026-10-18',
    categoria: 'Lazer',
  },
  {
    id: '4',
    descricao: 'Conta de energia',
    valor: 120,
    data: '2026-10-17',
    categoria: 'Contas',
  },
];

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(novaDespesa) {
    setDespesas((despesasAtuais) => [
      novaDespesa,
      ...despesasAtuais,
    ]);
  }
}

function NavegacaoAbas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const nomeIcone =
            route.name === 'Recentes'
              ? 'time-outline'
              : 'wallet-outline';

          return (
            <Ionicons
              name={nomeIcone}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#351401',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Recentes"
        component={DespesasRecentes}
      />
      <Tab.Screen
        name="Todas"
        component={TodasDespesas}
      />
    </Tab.Navigator>
  );
}

export default function App() {
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
          options={{ title: 'Gerenciar Despesa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
