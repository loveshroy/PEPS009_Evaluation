import { useState } from "react";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); 

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="page">
      <h1>Dashboard – To-Do List</h1>

      <div className="todo-counts">
        <div className="count pending">Pending: {pendingCount}</div>
        <div className="count completed">Completed: {completedCount}</div>
      </div>

      <div className="todo-box">
        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <ul className="todo-list">
          {filteredTasks.length === 0 && (
            <p className="empty">No tasks to show</p>
          )}

          {filteredTasks.map((t, index) => (
            <li key={index} className={t.completed ? "done" : ""}>
              <span onClick={() => toggleTask(index)}>
                {t.text}
              </span>
              <small>{t.completed ? "Completed" : "Pending"}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
