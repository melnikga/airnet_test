
import './App.css';
import Calendar from './components/Calendar/Calendar';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <div>
      <header>
      </header>
      <body>
      <TaskProvider>
        <Calendar year={2024} month={0}/>
      </TaskProvider>
      </body>
    </div>
  );
}

export default App;
