import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: input, completed: false }
    ]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div style={styles.container}>
      <h2>Todo App</h2>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div style={styles.filters}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none"
            }}
          >
            {task.text}
          </li>
        ))}
      </ul>

      <div style={styles.counts}>
        <p> Completed: {completedCount}</p>
        <p> Pending: {pendingCount}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    textAlign: "center"
  },
  filters: {
    marginTop: "10px"
  },
  counts: {
    marginTop: "15px",
    fontWeight: "bold"
  }
};

export default App
