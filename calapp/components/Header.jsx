import { useTheme } from '../contexts/themeContexts';
import ThemeToggle from './ThemeToggle';

// Simple gear icon (SVG inline for clarity)
const GearIcon = () => (
  <button
    aria-label="Settings"
    style={{
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: useTheme().darkMode ? '#a3bffa' : '#4a5568',
      padding: '4px 8px',
    }}
  >
    ⚙️
  </button>
);

export default function Header() {
  const { darkMode } = useTheme();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header
      style={{
        padding: '16px 20px',
        borderBottom: darkMode ? '1px solid #4a5568' : '1px solid #e2e8f0',
        marginBottom: '20px',
        background: darkMode ? '#1a202c' : '#ffffff',
        color: darkMode ? '#e2e8f0' : '#2d3748',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          marginBottom: '8px',
        }}
        className="header-top-row"
      >
        {/* Date - Mobile: left, Desktop: hidden */}
        <span style={{ fontWeight: 'normal' }}>{today}</span>

        {/* Theme Toggle - Mobile: center, Desktop: hidden */}
        <ThemeToggle />

        {/* Gear Icon - Mobile: right, Desktop: hidden */}
        <GearIcon />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="header-bottom-row"
      >
        <h1
          style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: darkMode ? '#f7fafc' : '#2d3748',
          }}
        >
          Calendar
        </h1>

        {/* Desktop: Theme + Gear side by side */}
        <div
          style={{
            display: 'none',
            gap: '12px',
          }}
          className="header-actions"
        >
          <ThemeToggle />
          <GearIcon />
        </div>
      </div>

      <style jsx>{\`
        .header-top-row {
          display: flex;
        }
        .header-bottom-row {
          justify-content: center;
        }
        .header-bottom-row h1 {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .header-bottom-row .header-actions {
          display: none;
        }

        @media (min-width: 768px) {
          .header-top-row {
            display: none;
          }
          .header-bottom-row {
            justify-content: space-between;
            position: relative;
          }
          .header-bottom-row h1 {
            position: static;
            transform: none;
            left: auto;
          }
          .header-bottom-row .header-actions {
            display: flex;
          }
        }
      \`}</style>
    </header>
  );
}
