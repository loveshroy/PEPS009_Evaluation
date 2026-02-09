import { useState } from "react";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      { text: task, completed: false }
    ]);
    setTask("");
  };

  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {/* PENDING + COMPLETED */}
      <div className="todo-counts">
        <div className="count pending">Pending: {pendingCount}</div>
        <div className="count completed">Completed: {completedCount}</div>
      </div>

      {/* YAHA PAR HAI TO-DO LIST */}
      <div className="todo-box">
        <h2>To-Do List</h2>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="todo-list">
          {tasks.map((t, index) => (
            <li key={index} className={t.completed ? "done" : ""}>
              <span onClick={() => toggleStatus(index)}>
                {t.text}
              </span>
              <small>
                {t.completed ? "Completed" : "Pending"}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
