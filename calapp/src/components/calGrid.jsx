import { format, getWeek, isSameMonth, isSameDay, addDays, startOfWeek, endOfWeek } from 'date-fns';

const CalendarGrid = ({ currentDate, monthDays }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(format(addDays(weekStart, i), 'EEE'));
  }

  // Generate 6 weeks (7 days each) to cover all possible month layouts
  const weeks = [];
  let currentWeekStart = startOfWeek(monthDays[0], { weekStartsOn: 1 });
  
  for (let w = 0; w < 6; w++) {
    const week = [];
    const weekNumber = getWeek(addDays(currentWeekStart, w * 7));
    
    // Add week number as first cell
    week.push(
      <div key={`week-${weekNumber}`} className="week-number">
        {weekNumber}
      </div>
    );

    // Add days
    for (let d = 0; d < 7; d++) {
      const day = addDays(currentWeekStart, w * 7 + d);
      const isCurrentMonth = isSameMonth(day, currentDate);
      const isToday = isSameDay(day, new Date());
      
      week.push(
        <div 
          key={day.toString()} 
          className={`day-cell ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`}
        >
          <div className="day-number">{format(day, 'd')}</div>
        </div>
      );
    }
    
    weeks.push(
      <div key={`week-${w}`} className="week-row">
        {week}
      </div>
    );
  }

  return (
    <div className="calendar-grid">
      <div className="week-header">
        <div className="week-number-header"></div>
        {daysOfWeek.map((day, i) => (
          <div key={i} className="day-header">
            {day}
          </div>
        ))}
      </div>
      {weeks}
    </div>
  );
};

export default CalendarGrid;