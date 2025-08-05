#!/bin/bash

# Function to create a directory if it doesn't exist
create_dir() {
  mkdir -p "$1"
}

# Function to create a file with content
create_file() {
  local filename="$1"
  shift
  cat > "$filename" << EOF
$@
EOF
}

# --- Step 1: Create Directories ---
echo "Creating directories..."
create_dir components
create_dir contexts
create_dir styles

# --- Step 2: Create Context File (themeContexts.jsx) ---
echo "Creating theme context..."
create_file contexts/themeContexts.jsx << 'EOF'
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // default: light

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
EOF

# --- Step 3: Create Components ---
echo "Creating components..."

# Header.jsx
create_file components/Header.jsx << 'EOF'
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '20px',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '24px', color: '#2d3748' }}>
        Calendar
      </h1>
      <ThemeToggle />
    </header>
  );
}
EOF

# MiniCalendar.jsx
create_file components/MiniCalendar.jsx << 'EOF'
import { useState } from 'react';
import { useTheme } from '../contexts/themeContexts';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MiniCalendar() {
  const { darkMode } = useTheme();
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push('');
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div
      style={{
        width: '250px',
        padding: '16px',
        borderRadius: '12px',
        border: darkMode ? '1px solid #4a5568' : '1px solid #e2e8f0',
        background: darkMode ? '#1a202c' : 'white',
        color: darkMode ? 'white' : '#2d3748',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ margin: '0 0 12px', textAlign: 'center', fontSize: '18px' }}>
        {months[month]} {year}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          fontSize: '12px',
        }}
      >
        {days.map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </div>
        ))}
        {calendarDays.map((day, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              padding: '6px 0',
              borderRadius: day === today ? '50%' : '0',
              background: day === today && !darkMode ? '#805ad5' : '',
              color: day === today ? 'white' : '',
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
EOF

# CalendarGrid.jsx
create_file components/CalendarGrid.jsx << 'EOF'
import { useTheme } from '../contexts/themeContexts';

export default function CalendarGrid() {
  const { darkMode } = useTheme();

  const weeks = Array(5).fill().map((_, i) => i);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div
      style={{
        flex: 1,
        padding: '20px',
        background: darkMode ? '#1a202c' : 'white',
        borderRadius: '12px',
        border: darkMode ? '1px solid #4a5568' : '1px solid #e2e8f0',
      }}
    >
      <h2 style={{ color: darkMode ? 'white' : '#2d3748' }}>February 2025</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
        }}
      >
        {days.map(day => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontWeight: '600',
              padding: '10px',
              color: darkMode ? '#e2e8f0' : '#4a5568',
              borderBottom: darkMode ? '1px solid #2d3748' : '1px solid #cbd5e0',
            }}
          >
            {day}
          </div>
        ))}
        {weeks.flatMap(week =>
          Array(7).fill().map((_, day) => {
            const date = week * 7 + day - 2;
            if (date < 1 || date > 31) return <div key={`${week}-${day}`}></div>;
            return (
              <div
                key={`${week}-${day}`}
                style={{
                  minHeight: '80px',
                  border: darkMode ? '1px solid #2d3748' : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px',
                  fontSize: '14px',
                  color: darkMode ? '#e2e8f0' : '#2d3748',
                  background: date === 14 ? '#805ad510' : 'transparent',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{date}</div>
                {date === 14 && (
                  <div style={{ fontSize: '10px', marginTop: '4px', color: '#805ad5' }}>
                    Meeting
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
EOF

# ThemeToggle.jsx
create_file components/ThemeToggle.jsx << 'EOF'
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
EOF

# --- Step 4: Update App.jsx ---
echo "Updating App.jsx..."
create_file App.jsx << 'EOF'
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
EOF

# --- Step 5: Update main.jsx ---
echo "Updating main.jsx..."
create_file main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/themeContexts';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
EOF

# --- Step 6: Add global styles ---
echo "Adding global styles..."
create_file styles/global.css << 'EOF'
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  line-height: 1.6;
}
EOF

# --- Final Message ---
echo ""
echo "🎉 Calendar app setup complete!"
echo "👉 Run 'npm run dev' to start your app."
echo "💡 The theme toggle will let you switch between light/dark mode."
