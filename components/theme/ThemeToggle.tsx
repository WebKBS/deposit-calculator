'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeState, setThemeState] = useState('dark');

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
      setThemeState('light');
    } else {
      setTheme('dark');
      setThemeState('dark');
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
