import { useEffect } from 'react';

import { DarkModeContext } from './DarkModeContext';

import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  useEffect(() => {
    const addClass = isDarkMode ? 'dark-mode' : 'light-mode';
    const removeClass = isDarkMode ? 'light-mode' : 'dark-mode';

    document.documentElement.classList.add(addClass);
    document.documentElement.classList.remove(removeClass);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
