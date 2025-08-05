import { useTheme } from '../contexts/themeContexts';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: darkMode ? '#a3bffa' : '#4a5568',
        padding: '4px 8px',
      }}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
