
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function DespesaItem({ despesa, onPress }) {

  function getDataFormatada(data) {
    const dataObj = new Date(data);

    return dataObj.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressionado,
      ]}
    >
      <View style={styles.informacoes}>
        <Text style={styles.descricao}>
          {despesa.descricao}
        </Text>

        <View style={styles.detalhes}>
          <Text style={styles.data}>
            {getDataFormatada(despesa.data)}
          </Text>

          <View style={styles.categoriaContainer}>
            <Text style={styles.categoria}>
              {despesa.categoria}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.valorContainer}>
        <Text style={styles.valor}>
          R$ {Number(despesa.valor).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 12,
    elevation: 2,
  },
  pressionado: {
    opacity: 0.7,
  },
  informacoes: {
    flex: 1,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  detalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  data: {
    fontSize: 12,
    color: '#777777',
    marginRight: 10,
  },
  categoriaContainer: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoria: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  valorContainer: {
    marginLeft: 10,
  },
  valor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#351401',
  },
});
