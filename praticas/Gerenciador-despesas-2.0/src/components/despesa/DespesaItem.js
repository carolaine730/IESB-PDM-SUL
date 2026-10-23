
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';

import { useTheme } from '../../store/theme-context';

export default function DespesaItem({ despesa, onPress }) {
  const { colors } = useTheme();

  function getDataFormatada(date) {
    if (!date) return '';

    const dataObj = new Date(date);

    if (isNaN(dataObj.getTime())) return '';

    return dataObj.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Editar despesa ${despesa.description}`}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.pressionado,
      ]}
    >
      <View style={styles.informacoes}>
        <Text
          style={[
            styles.descricao,
            { color: colors.text },
          ]}
        >
          {despesa.description}
        </Text>

        <View style={styles.detalhes}>
          <Text
            style={[
              styles.data,
              { color: colors.textSecondary },
            ]}
          >
            {getDataFormatada(despesa.date)}
          </Text>

          <View
            style={[
              styles.categoriaContainer,
              {
                backgroundColor: colors.category,
              },
            ]}
          >
            <Text
              style={[
                styles.categoria,
                { color: colors.categoryText },
              ]}
            >
              {despesa.category}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.valorContainer}>
        <Text
          style={[
            styles.valor,
            { color: colors.text },
          ]}
        >
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
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 12,

    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
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
  },

  detalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },

  data: {
    fontSize: 12,
    marginRight: 10,
  },

  categoriaContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  categoria: {
    fontSize: 12,
    fontWeight: '600',
  },

  valorContainer: {
    marginLeft: 10,
  },

  valor: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
