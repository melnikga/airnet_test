import React, { useState } from 'react';
import Day from './Day';
import TaskModal from '../TaskModal/TaskModal';


interface CalendarProps {
  year: number;
  month: number;
}

const Calendar: React.FC<CalendarProps> = ({ year, month: initialMonth }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState(initialMonth);

  const prevMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const nextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };


  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day" />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    days.push(
      <Day
        key={i}
        date={date}
        isWeekend={isWeekend}
        isHoliday={false}
        onClick={() => {
          setSelectedDate(date);
          setShowModal(true);
        }}
      />
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
          <button onClick={prevMonth}>&#8249;</button>
          <div className="month-name">
            {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
          </div>
          <button onClick={nextMonth}>&#8250;</button>
        </div>
      <div className="calendar__weekdays">
        {daysOfWeek.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar__grid">{days}</div>
      {showModal && (
        <TaskModal
          date={selectedDate!}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Calendar;