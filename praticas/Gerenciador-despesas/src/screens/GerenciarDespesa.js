
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function GerenciarDespesa() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  function alterarValor(texto) {
    const valorFormatado = texto.replace(',', '.');

    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(valorFormatado)) {
      setValor(valorFormatado);
    }
  }

  function alterarData(evento, dataSelecionada) {
    setMostrarCalendario(false);

    if (dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function salvarDespesa() {
    if (
      descricao.trim() === '' ||
      valor.trim() === '' ||
      categoria === ''
    ) {
      Alert.alert(
        'Atenção',
        'Preencha a descrição, o valor e a categoria.'
      );
      return;
    }

    if (Number(valor) <= 0) {
      Alert.alert(
        'Valor inválido',
        'Informe um valor maior que zero.'
      );
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: Number(valor),
      categoria,
      data: data.toISOString().split('T')[0],
    };

    console.log('Despesa cadastrada:', novaDespesa);

    Alert.alert(
      'Sucesso',
      'Formulário validado com sucesso!'
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>
        Cadastrar Despesa
      </Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Supermercado"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150.00"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={alterarValor}
      />

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categorias}>
        {CATEGORIAS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategoria(item)}
            style={[
              styles.botaoCategoria,
              categoria === item && styles.categoriaSelecionada,
            ]}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoSelecionado,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Data</Text>

      <Pressable
        style={styles.botaoData}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text>
          {data.toLocaleDateString('pt-BR')}
        </Text>
      </Pressable>

      {mostrarCalendario && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={alterarData}
        />
      )}

      <Pressable
        style={styles.botaoSalvar}
        onPress={salvarDespesa}
      >
        <Text style={styles.textoSalvar}>
          Salvar Despesa
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  conteudo: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#351401',
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  botaoCategoria: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoriaSelecionada: {
    backgroundColor: '#351401',
  },
  textoCategoria: {
    color: '#333333',
  },
  textoSelecionado: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoData: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 30,
  },
  botaoSalvar: {
    backgroundColor: '#351401',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoSalvar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
