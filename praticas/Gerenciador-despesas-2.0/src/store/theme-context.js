
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import { useColorScheme } from 'react-native';

import { COLORS } from '../constants/theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemTheme = useColorScheme();

  const [selectedTheme, setSelectedTheme] = useState(null);

  const theme = selectedTheme || (
    systemTheme === 'dark' ? 'dark' : 'light'
  );

  const isDark = theme === 'dark';

  const colors = COLORS[theme];

  function toggleTheme() {
    setSelectedTheme(
      theme === 'dark' ? 'light' : 'dark'
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        colors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme deve ser utilizado dentro de ThemeProvider.'
    );
  }

  return context;
}
