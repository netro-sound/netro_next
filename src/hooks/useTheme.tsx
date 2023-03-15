import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const mapTheme = {
    light: 'bumblebee',
    dark: 'halloween',
  };

  function toggleTheme() {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', mapTheme[theme]);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
