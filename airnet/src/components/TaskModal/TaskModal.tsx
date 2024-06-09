import React, { useContext, useState } from 'react';

import './index.css';
import { TaskContext } from '../../context/TaskContext';

interface TaskModalProps {
  date: Date;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ date, onClose }) => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        date,
				completed: false
      };
      addTask(task);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const filteredTasks = tasks.filter((task) => task.date.toDateString() === date.toDateString());
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2>{date.toLocaleDateString()}</h2>
          <button className="modal__close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal__body">
          <div className="task-list">
					{filteredTasks.map((task) => (
              <div key={task.id} className="task">
								<input type='checkbox' checked={task.completed} onClick={() => toggleTaskCompletion(task.id)}/>
                <span
                  className={task.completed ? 'task--completed' : ''}
                >
                  {task.text}
                </span>
                <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
              </div>
            ))}
          </div>
          <div className="task-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Добавить новую задачу"
            />
            <button onClick={handleAddTask}>Добавить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;