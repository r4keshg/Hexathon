
import React from 'react';

interface CalendarDayProps {
  level: 0 | 1 | 2 | 3;
  date: string;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ level, date }) => {
  const getBackgroundColor = () => {
    switch (level) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-brand-200';
      case 2: return 'bg-brand-400';
      case 3: return 'bg-brand-600';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div 
      className={`h-4 w-4 rounded-sm ${getBackgroundColor()} cursor-pointer`} 
      title={`${date}: ${level === 0 ? 'No activity' : 
              level === 1 ? 'Light activity' : 
              level === 2 ? 'Medium activity' : 'High activity'}`}
    />
  );
};

const StreakCalendar: React.FC = () => {
  // Mock data for the calendar
  // In a real app, this would come from an API or state
  const generateCalendarData = () => {
    const days = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // Go back 1 year
    
    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Generate random activity level for demo
      // In a real app, this would be actual user activity data
      const randomLevel = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
      const dateString = currentDate.toLocaleDateString();
      
      days.push({ date: dateString, level: randomLevel });
    }
    
    return days;
  };

  const calendarData = generateCalendarData();
  
  // Group days by week for the grid layout
  const weeks = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-between text-xs text-gray-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
      <div className="flex">
        <div className="mr-2 flex flex-col justify-around text-xs text-gray-500">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-1" style={{ width: 'max-content' }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <CalendarDay 
                    key={`${weekIndex}-${dayIndex}`} 
                    level={day.level} 
                    date={day.date} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-right">
        Current streak: 5 days
      </div>
    </div>
  );
};

export default StreakCalendar;
