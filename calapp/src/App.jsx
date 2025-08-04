import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import './styles/global.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMiniCalendars, setShowMiniCalendars] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        currentDate={currentDate} 
        prevMonth={prevMonth} 
        nextMonth={nextMonth}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowMiniCalendars={setShowMiniCalendars}
      />
      <CalendarGrid 
        currentDate={currentDate} 
        monthDays={monthDays} 
      />
      {/* We'll add MiniCalendar and Events components later */}
    </div>
  );
}

export default App;