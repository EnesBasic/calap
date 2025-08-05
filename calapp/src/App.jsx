import { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import CalendarGrid from './components/CalendarGrid';
import MiniCalendar from './components/MiniCalendar';
import Header from './components/Header';
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
        showMiniCalendars={showMiniCalendars}  
      />
      <CalendarGrid 
        currentDate={currentDate} 
        monthDays={monthDays} 
      />
      {showMiniCalendars && (
        <div className="mini-calendars-container">
          <MiniCalendar 
            currentDate={new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)} 
            onSelectDate={setCurrentDate}
          />
          <MiniCalendar 
            currentDate={new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)} 
            onSelectDate={setCurrentDate}
          />
        </div>
      )}
    </div>
  );
}

export default App;