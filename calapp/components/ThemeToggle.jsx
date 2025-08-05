import { useTheme } from '../contexts/themeContexts';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        background: darkMode ? '#6b46c1' : '#805ad5',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {darkMode ? '🌙 Light Mode' : '☀️ Dark Mode'}
    </button>
  );
}
