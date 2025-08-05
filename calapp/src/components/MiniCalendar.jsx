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