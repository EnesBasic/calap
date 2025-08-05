import Header from './components/Header';
import MiniCalendar from './components/MiniCalendar';
import CalendarGrid from './components/CalendarGrid';
import { useTheme } from './contexts/themeContexts';

export default function App() {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode ? '#121212' : '#f7fafc',
        color: darkMode ? '#e2e8f0' : '#2d3748',
        fontFamily: 'Arial, sans-serif',
        transition: 'background 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Header />
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <MiniCalendar />
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
}
