
import { View } from "react-native";

import DespesaSaida from "../components/despesa/DespesaSaida";
import { DESPESAS } from "../data/despesas";

function TodasDespesas() {
  return (
    <View style={{ flex: 1 }}>
      <DespesaSaida
        despesas={DESPESAS}
        periodo="Total"
      />
    </View>
  );
}

export default TodasDespesas;
