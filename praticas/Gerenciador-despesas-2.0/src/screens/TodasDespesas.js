
import React, { useState, useMemo } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../store/theme-context';
import useDebounce from '../hooks/useDebounce';

const CATEGORIAS = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();

  // Tema claro e escuro controlado pelo aplicativo
  const { isDark, colors, toggleTheme } = useTheme();

  // Estados da busca e da categoria
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('Todas');

  // Aguarda 300ms após a última digitação
  const buscaDebounced = useDebounce(busca, 300);

  // Filtra despesas por descrição e categoria
  const despesasFiltradas = useMemo(() => {
    const textoBusca = buscaDebounced
      .trim()
      .toLocaleLowerCase('pt-BR');

    return expenses.filter((expense) => {
      const correspondeCategoria =
        categoriaSelecionada === 'Todas' ||
        expense.category === categoriaSelecionada;

      const correspondeBusca = String(
        expense.description || ''
      )
        .toLocaleLowerCase('pt-BR')
        .includes(textoBusca);

      return correspondeCategoria && correspondeBusca;
    });
  }, [expenses, categoriaSelecionada, buscaDebounced]);

  function abrirCadastro() {
    navigation.navigate('GerenciarDespesa');
  }

  function abrirEdicao(id) {
    navigation.navigate('GerenciarDespesa', {
      expenseId: id,
    });
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text
          style={[
            styles.titulo,
            { color: colors.text },
          ]}
        >
          Todas as Despesas
        </Text>

        <View style={styles.acoesCabecalho}>
          {/* Botão para alternar o tema */}
          <Pressable
            onPress={toggleTheme}
            accessibilityRole="button"
            accessibilityLabel={
              isDark
                ? 'Ativar tema claro'
                : 'Ativar tema escuro'
            }
            style={[
              styles.botaoTema,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name={
                isDark
                  ? 'sunny-outline'
                  : 'moon-outline'
              }
              size={23}
              color={colors.primary}
            />
          </Pressable>

          {/* Botão para adicionar despesa */}
          <Pressable
            onPress={abrirCadastro}
            accessibilityRole="button"
            accessibilityLabel="Adicionar despesa"
            style={[
              styles.botaoAdicionar,
              { backgroundColor: colors.primary },
            ]}
          >
            <Ionicons
              name="add"
              size={26}
              color={isDark ? '#121212' : '#FFFFFF'}
            />
          </Pressable>
        </View>
      </View>

      {/* Campo de pesquisa */}
      <View
        style={[
          styles.containerBusca,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={21}
          color={colors.textSecondary}
        />

        <TextInput
          style={[
            styles.inputBusca,
            { color: colors.text },
          ]}
          placeholder="Buscar despesa pela descrição..."
          placeholderTextColor={colors.placeholder}
          value={busca}
          onChangeText={setBusca}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {busca.length > 0 && (
          <Pressable
            onPress={() => setBusca('')}
            accessibilityRole="button"
            accessibilityLabel="Limpar busca"
          >
            <Ionicons
              name="close-circle"
              size={21}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {/* Filtro por categoria */}
      <Text
        style={[
          styles.subtitulo,
          { color: colors.text },
        ]}
      >
        Filtrar por categoria:
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
        contentContainerStyle={styles.filtrosConteudo}
        keyboardShouldPersistTaps="handled"
      >
        {CATEGORIAS.map((categoria) => {
          const selecionada =
            categoriaSelecionada === categoria;

          return (
            <Pressable
              key={categoria}
              onPress={() =>
                setCategoriaSelecionada(categoria)
              }
              style={[
                styles.botaoFiltro,
                {
                  backgroundColor: selecionada
                    ? colors.primary
                    : colors.category,
                },
              ]}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  {
                    color: selecionada
                      ? isDark
                        ? '#121212'
                        : '#FFFFFF'
                      : colors.categoryText,
                  },
                ]}
              >
                {categoria}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Lista e resumo das despesas */}
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={
          categoriaSelecionada === 'Todas'
            ? 'Total de Despesas'
            : `Total - ${categoriaSelecionada}`
        }
        onSelecionarDespesa={abrirEdicao}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight || 0
        : 0,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
    minHeight: 44,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  acoesCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  botaoTema: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  botaoAdicionar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    height: 48,
  },

  inputBusca: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    paddingVertical: 8,
  },

  subtitulo: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 15,
    marginBottom: 8,
  },

  filtros: {
    flexGrow: 0,
    marginBottom: 10,
  },

  filtrosConteudo: {
    paddingHorizontal: 12,
    alignItems: 'center',
    paddingVertical: 5,
  },

  botaoFiltro: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  textoFiltro: {
    fontSize: 13,
    fontWeight: '500',
  },
});
