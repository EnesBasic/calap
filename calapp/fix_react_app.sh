#!/bin/bash

# Install missing dependencies
echo "Installing required packages..."
npm install date-fns @mui/icons-material @testing-library/react @testing-library/jest-dom

# Fix unused imports in App.jsx
echo "Fixing unused imports in App.jsx..."
sed -i '/import {.*isSameMonth, isSameDay.*}/d' src/App.jsx
sed -i 's/import { format, startOfMonth, endOfMonth, eachDayOfInterval }/import { startOfMonth, endOfMonth, eachDayOfInterval }/' src/App.jsx

# Add proper test setup in App.test.js
echo "Setting up App.test.js..."
cat > src/App.test.js << 'EOL'
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calendar header', () => {
  render(<App />);
  const headerElement = screen.getByText(/August 2025/i); // Update month/year as needed
  expect(headerElement).toBeInTheDocument();
});
EOL

# Fix MiniCalendar.jsx (replace incorrect Header code)
echo "Fixing MiniCalendar.jsx..."
cat > src/components/MiniCalendar.jsx << 'EOL'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const MiniCalendar = ({ currentDate, onSelectDate }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="mini-calendar">
      <h3>{format(currentDate, 'MMMM yyyy')}</h3>
      <div className="mini-grid">
        {monthDays.map((day, i) => (
          <button
            key={i}
            className={`mini-day ${isSameMonth(day, currentDate) ? '' : 'other-month'} ${isSameDay(day, currentDate) ? 'selected' : ''}`}
            onClick={() => onSelectDate(day)}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
EOL

# Fix Header.jsx (add missing showMiniCalendars prop)
echo "Fixing Header.jsx..."
sed -i 's/const Header = ({ currentDate, prevMonth, nextMonth, darkMode, setDarkMode, setShowMiniCalendars })/const Header = ({ currentDate, prevMonth, nextMonth, darkMode, setDarkMode, setShowMiniCalendars, showMiniCalendars })/' src/components/Header.jsx

# Run tests to verify
echo "Running tests..."
npm test -- --watchAll=false

echo "All fixes applied! 🎉"