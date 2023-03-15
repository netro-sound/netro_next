import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  const storedKey = `${COOKIE_NAME}.theme`;

  const mapTheme = {
    light: 'bumblebee',
    dark: 'halloween',
  };

  function toggleTheme() {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem(storedKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storedKey, theme);
    document.documentElement.setAttribute('data-theme', mapTheme[theme]);
  }, [theme]);

  return [theme, toggleTheme] as const;
}
