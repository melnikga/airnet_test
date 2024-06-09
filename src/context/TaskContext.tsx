import React, { createContext, useState } from 'react';

interface Task {
  id: string;
  text: string;
  date: Date;
  completed: boolean; 
}

interface TaskContextData {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
	toggleTaskCompletion: (taskId: string) => void;
}

export const TaskContext = createContext<TaskContextData>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
	toggleTaskCompletion: () => {}
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

	const addTask = (task: Task) => {
		setTasks([...tasks, { ...task, completed: false }]); // По умолчанию новая задача не выполнена
	};

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

	const toggleTaskCompletion = (taskId: string) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const contextValue: TaskContextData = {
		tasks,
		addTask,
		deleteTask,
		toggleTaskCompletion,
	};

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};