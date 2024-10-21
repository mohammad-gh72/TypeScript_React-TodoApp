import { useState } from "react";
import TodoForm from "./components/TodoForm";
import type { Task } from "./types/Task";
import RenderTasks from "./components/RenderTasks";
function App() {
  const [todo, setTodo] = useState<Task[]>([]);
  return (
    <div className="app">
      <TodoForm setTodo={setTodo} />
      <RenderTasks todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
