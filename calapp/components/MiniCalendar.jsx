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
