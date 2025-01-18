import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Task } from './components/Task';
function App() {
  const [data, updateData] = useState<any>([]);

  useEffect(() => {
    updateData([
      {
        id: 1,
        title: "Sample test note completion",
        dueDate: "10/01/2025:10:00",
        desc: "Complete the sample test note for review and submission."
      },
      {
        id: 2,
        title: "Big task completion pending",
        dueDate: "10/01/2025:10:00",
        desc: "Finish the major task that has been marked as pending for the project deadline."
      },
      {
        id: 3,
        title: "Sample test note completion",
        dueDate: "10/01/2025:10:00",
        desc: "Ensure the sample test note is fully prepared for presentation."
      }
    ]);
  }, []);

  const completeTask = useCallback(
    (id: number) => {
      updateData((prevTasks: any[]) => prevTasks.filter((task) => task.id !== id));
    },
    [updateData]
  );

  return (
    <>
      {data.map((item: any) => (
        <Task
          key={item.id}
          id={item.id}
          title={item.title}
          desc={item.desc}
          dueDate={item.dueDate}
          completeTask={completeTask}
        />
      ))}
    </>
  );
}

export default App;
