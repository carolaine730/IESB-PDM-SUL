import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesas from "./screens/GerenciarDespesas";
import TodasDespesas from "./screens/TodasDespesas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Tab = createBottomTabNavigator();

  function BottomTabScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="DespesasRecentes" component={DespesasRecentes} />
        <Tab.Screen name="TodasDespesas" component={TodasDespesas} />
      </Tab.Navigator>
    )
  }

  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} options={{headerShown: false}}/>
        <Stack.Screen name="GerenciarDespesas" component={GerenciarDespesas} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
