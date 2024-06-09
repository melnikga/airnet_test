import React, { useContext } from 'react';

import './index.css';
import { TaskContext } from '../../context/TaskContext';

interface DayProps {
  date: Date;
  isWeekend: boolean;
  isHoliday: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ date, isWeekend, isHoliday, onClick }) => {
  const { tasks } = useContext(TaskContext);
  const classNames = ['day'];

  if (isWeekend) {
    classNames.push('day--weekend');
  }

  if (isHoliday) {
    classNames.push('day--holiday');
  }

  const dayTasks = tasks.filter((task) => task.date.toDateString() === date.toDateString());
  const completedTasks = dayTasks.filter((task) => task.completed);
  const incompleteTasks = dayTasks.filter((task) => !task.completed);


  return (
    <div className={classNames.join(' ')} onClick={onClick}>
      <div className="day__number">{date.getDate()}</div>
			<div className="day__tasks_incomplete_count day__task--incomplete"> 
			{incompleteTasks.length}
			</div>
			<div className="day__tasks_complete_count day__task--completed"> 
			{completedTasks.length}
			</div>
      <div className="day__tasks">
        {incompleteTasks.slice(0,4).map((task) => (
          <div key={task.id} className="day__task day__task--incomplete">
            {task.text}
          </div>
        ))}

        {/* {completedTasks.slice(0,2).map((task) => (
          <div key={task.id} className="day__task day__task--completed">
            {task.text}
          </div>
        ))} */}
      </div>
    </div>
  );
};
export default Day;