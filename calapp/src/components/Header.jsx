import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Settings } from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';

const Header = ({ currentDate, prevMonth, nextMonth, darkMode, setDarkMode, setShowMiniCalendars, showMiniCalendars }) => {
  return (
    <header className="calendar-header">
      <div className="header-top">
        <div className="current-date">{format(currentDate, 'd')}</div>
        <div className="header-controls">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <button 
            className="settings-btn" 
            onClick={() => setShowMiniCalendars(prev => !prev)}
            aria-label={showMiniCalendars ? 'Hide mini calendars' : 'Show mini calendars'}
          >
            <Settings />
          </button>
        </div>
      </div>
      <div className="month-navigation">
        <button className="nav-arrow" onClick={prevMonth}>
          <ChevronLeft />
        </button>
        <h2 className="month-year">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button className="nav-arrow" onClick={nextMonth}>
          <ChevronRight />
        </button>
      </div>
    </header>
  );
};

export default Header;