
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useExpenses } from '../store/expenses-context';
import { COLORS } from '../constants/theme';
import { useTheme } from '../store/theme-context';

const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

const VALUE_REGEX = /^\d*\.?\d{0,2}$/;

function formatDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function parseDate(value) {
  if (!value) {
    return new Date();
  }

  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function displayDate(value) {
  if (!value) {
    return 'Selecionar data';
  }

  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function validate(values) {
  const errors = {};

  if (!values.description.trim() ||
      values.description.trim().length < 3) {
    errors.description =
      'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (!values.date) {
    errors.date = 'Selecione uma data.';
  } else {
    const selectedDate = parseDate(values.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate > today
    ) {
      errors.date = 'A data não pode ser futura.';
    }
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({
  navigation,
  route,
}) {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = COLORS[isDark ? 'dark' : 'light'];

  const expenseId = route.params?.expenseId;
  const isEditing = expenseId !== undefined &&
                    expenseId !== null;

  const existingExpense = expenses.find(
    (expense) => expense.id === expenseId
  );

  const [form, setForm] = useState(() => ({
    description: existingExpense?.description || '',
    amount: existingExpense
      ? String(existingExpense.amount)
      : '',
    date: existingExpense?.date || '',
    category: existingExpense?.category || '',
  }));

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  // Atualiza o título da tela conforme o modo
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerStyle: {
        backgroundColor: colors.surface,
      },
      headerTintColor: colors.text,
    });
  }, [navigation, isEditing, colors.surface, colors.text]);

  // Atualiza um campo do formulário
  function handleChange(field, value) {
    const updatedForm = {
      ...form,
      [field]: value,
    };

    setForm(updatedForm);

    // Remove o erro do campo quando for corrigido
    if (errors[field]) {
      const updatedErrors = validate(updatedForm);

      setErrors((previousErrors) => ({
        ...previousErrors,
        [field]: updatedErrors[field],
      }));
    }
  }

  // Permite somente números com até 2 casas decimais
  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');

    if (VALUE_REGEX.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'dismissed') {
      return;
    }

    if (selectedDate) {
      handleChange('date', formatDate(selectedDate));
    }
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const expenseData = {
      id: isEditing
        ? expenseId
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }

    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert(
      'Excluir despesa',
      'Tem certeza que deseja excluir esta despesa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteExpense(expenseId);
            navigation.goBack();
          },
        },
      ]
    );
  }

  function inputStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: colors.surface,
        color: colors.text,
        borderColor: errors[field]
          ? colors.danger
          : colors.border,
      },
    ];
  }

  function ErrorMessage({ field }) {
    if (!errors[field]) {
      return null;
    }

    return (
      <Text style={[styles.error, { color: colors.danger }]}>
        {errors[field]}
      </Text>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {isEditing ? 'Editar Despesa' : 'Cadastrar Despesa'}
        </Text>

        {/* DESCRIÇÃO */}
        <Text style={[styles.label, { color: colors.text }]}>
          Descrição
        </Text>

        <TextInput
          style={inputStyle('description')}
          placeholder="Ex: Supermercado"
          placeholderTextColor={colors.placeholder}
          value={form.description}
          onChangeText={(text) =>
            handleChange('description', text)
          }
        />

        <ErrorMessage field="description" />

        {/* VALOR */}
        <Text style={[styles.label, { color: colors.text }]}>
          Valor (R$)
        </Text>

        <TextInput
          style={inputStyle('amount')}
          placeholder="Ex: 150.00"
          placeholderTextColor={colors.placeholder}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={handleAmountChange}
        />

        <ErrorMessage field="amount" />

        {/* DATA */}
        <Text style={[styles.label, { color: colors.text }]}>
          Data
        </Text>

        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={[
            styles.selectButton,
            {
              backgroundColor: colors.surface,
              borderColor: errors.date
                ? colors.danger
                : colors.border,
            },
          ]}
        >
          <Text style={{ color: colors.text }}>
            {displayDate(form.date)}
          </Text>

          <Ionicons
            name="calendar-outline"
            size={22}
            color={colors.textSecondary}
          />
        </Pressable>

        <ErrorMessage field="date" />

        {showDatePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={parseDate(form.date)}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* CATEGORIA */}
        <Text style={[styles.label, { color: colors.text }]}>
          Categoria
        </Text>

        <Pressable
          onPress={() => setShowCategoryModal(true)}
          style={[
            styles.selectButton,
            {
              backgroundColor: colors.surface,
              borderColor: errors.category
                ? colors.danger
                : colors.border,
            },
          ]}
        >
          <Text
            style={{
              color: form.category
                ? colors.text
                : colors.placeholder,
            }}
          >
            {form.category || 'Selecionar categoria'}
          </Text>

          <Ionicons
            name="chevron-down"
            size={22}
            color={colors.textSecondary}
          />
        </Pressable>

        <ErrorMessage field="category" />

        {/* SALVAR */}
        <Pressable
          onPress={handleSave}
          style={[
            styles.saveButton,
            { backgroundColor: colors.primary },
          ]}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: isDark ? '#121212' : '#FFFFFF' },
            ]}
          >
            {isEditing ? 'Salvar Alterações' : 'Salvar Despesa'}
          </Text>
        </Pressable>

        {/* EXCLUIR SOMENTE NA EDIÇÃO */}
        {isEditing && (
          <Pressable
            onPress={handleDelete}
            style={[
              styles.deleteButton,
              { borderColor: colors.danger },
            ]}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={colors.danger}
            />

            <Text
              style={[
                styles.deleteText,
                { color: colors.danger },
              ]}
            >
              Excluir Despesa
            </Text>
          </Pressable>
        )}
      </ScrollView>

      {/* MODAL DE CATEGORIAS */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.surface },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: colors.text },
              ]}
            >
              Selecione uma categoria
            </Text>

            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategoryModal(false);
                }}
                style={[
                  styles.categoryOption,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: colors.text },
                  ]}
                >
                  {category}
                </Text>

                {form.category === category && (
                  <Ionicons
                    name="checkmark"
                    size={22}
                    color={colors.primary}
                  />
                )}
              </Pressable>
            ))}

            <Pressable
              onPress={() => setShowCategoryModal(false)}
              style={styles.cancelButton}
            >
              <Text style={{ color: colors.danger }}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    fontSize: 12,
    marginBottom: 14,
    marginTop: 3,
  },
  selectButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 52,
  },
  saveButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 35,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryOption: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    padding: 14,
    alignItems: 'center',
  },
});
