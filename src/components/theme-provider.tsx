import { Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <Switch onClick={toggleTheme} size='lg' color='warning' startContent={<SunIcon />} endContent={<MoonIcon />} />
    </div>
  );
}
