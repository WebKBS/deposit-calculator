'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Button } from '../ui/button';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeState, setThemeState] = useState(<MdOutlineDarkMode size="20" />);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setThemeState(<MdOutlineLightMode size="20" />);
    } else {
      setThemeState(<MdOutlineDarkMode size="20" />);
    }
  }, [resolvedTheme]);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
      setThemeState(<MdOutlineDarkMode size="20" />);
    } else {
      setTheme('dark');
      setThemeState(<MdOutlineLightMode size="20" />);
    }
  };

  return (
    <div>
      <Button size="icon" onClick={toggleTheme}>
        {themeState}
      </Button>
    </div>
  );
}
