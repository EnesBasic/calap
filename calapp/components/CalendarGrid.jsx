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
