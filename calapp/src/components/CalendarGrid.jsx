import { format, getWeek, isSameMonth, isSameDay, addDays, startOfWeek } from 'date-fns';

const CalendarGrid = ({ currentDate, monthDays }) => {
  const weekConfig = { weekStartsOn: 1 };
  const croatianDays = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

  const weeks = Array.from({ length: 6 }).map((_, w) => {
    const currentWeekStart = startOfWeek(addDays(monthDays[0], w * 7), weekConfig);
    const weekNumber = getWeek(currentWeekStart);

    return (
      <div key={`week-${w}`} className="week-row">
        <div className="week-number">{weekNumber}</div>
        {Array.from({ length: 7 }).map((_, d) => {
          const day = addDays(currentWeekStart, d);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toString()}
              className={`day-cell ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`}
            >
              <div className="day-number">{format(day, 'd')}</div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="calendar-grid">
      <div className="week-header">
        <div className="week-number-header"></div>
        {croatianDays.map((day, i) => (
          <div key={i} className="day-header">{day}</div>
        ))}
      </div>
      {weeks}
    </div>
  );
};

export default CalendarGrid;