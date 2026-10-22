
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';

export default function DespesaItem({ despesa, onPress }) {

  function getDataFormatada(date) {
    const dataObj = new Date(date);

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
          {despesa.description}
        </Text>

        <View style={styles.detalhes}>
          <Text style={styles.data}>
            {getDataFormatada(despesa.date)}
          </Text>

          <View style={styles.categoriaContainer}>
            <Text style={styles.categoria}>
              {despesa.category}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.valorContainer}>
        <Text style={styles.valor}>
          R$ {Number(despesa.amount).toFixed(2).replace('.', ',')}
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

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        elevation: 2,
      },
    }),
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
