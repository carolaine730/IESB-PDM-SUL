
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext(null);

const STORAGE_KEY = '@expenses';

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? action.payload
          : expense
      );

    case 'DELETE':
      return state.filter(
        (expense) => expense.id !== action.payload
      );

    case 'SET':
      return [...action.payload];

    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Recuperar despesas salvas ao iniciar
  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedExpenses !== null) {
          const parsedExpenses = JSON.parse(storedExpenses);

          if (Array.isArray(parsedExpenses)) {
            dispatch({
              type: 'SET',
              payload: parsedExpenses,
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  // Salvar automaticamente quando a lista mudar
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(expenses)
        );
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    }

    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(expense) {
    dispatch({
      type: 'ADD',
      payload: expense,
    });
  }

  function updateExpense(expense) {
    dispatch({
      type: 'UPDATE',
      payload: expense,
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: 'DELETE',
      payload: id,
    });
  }

  function setExpenses(expensesList) {
    dispatch({
      type: 'SET',
      payload: expensesList,
    });
  }

  const value = {
    expenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error(
      'useExpenses deve ser utilizado dentro de ExpensesContextProvider.'
    );
  }

  return context;
}
