import { format, getWeek, isSameMonth, isSameDay, addDays, startOfWeek } from 'date-fns';

const CalendarGrid = ({ currentDate, monthDays }) => {
  // Week configuration (Monday start)
  const weekConfig = { weekStartsOn: 1 };
  const weekStart = startOfWeek(currentDate, weekConfig);
  
  // Generate day headers (Mon-Sun)
  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => 
    format(addDays(weekStart, i), 'EEE')
  );

  // Generate 6 weeks of calendar cells
  const weeks = Array.from({ length: 6 }).map((_, w) => {
    const currentWeekStart = startOfWeek(
      addDays(monthDays[0], w * 7), 
      weekConfig
    );
    const weekNumber = getWeek(currentWeekStart);

    return (
      <div key={`week-${w}`} className="week-row">
        {/* Week number cell */}
        <div className="week-number">{weekNumber}</div>
        
        {/* Day cells */}
        {Array.from({ length: 7 }).map((_, d) => {
          const day = addDays(currentWeekStart, d);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={day.toString()}
              className={`day-cell ${
                isCurrentMonth ? 'current-month' : 'other-month'
              } ${
                isToday ? 'today' : ''
              }`}
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
      {/* Header row */}
      <div className="week-header">
        <div className="week-number-header"></div>
        {daysOfWeek.map((day, i) => (
          <div key={i} className="day-header">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar weeks */}
      {weeks}
    </div>
  );
};

export default CalendarGrid;