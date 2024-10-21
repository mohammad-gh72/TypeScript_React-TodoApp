import { FormEvent, useState } from "react";
import type { Task } from "../types/Task";

interface TodoFormProps {
  setTodo: React.Dispatch<React.SetStateAction<Task[]>>;
}

function TodoForm({ setTodo }: TodoFormProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const taskObject: Task = {
      id: Math.trunc(Math.random() * 1000) + 1,
      task: input,
      isCompleted: false,
    };

    setTodo((prev) => [...prev, taskObject]);
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        value={input}
        type="text"
        placeholder="Enter a new task..."
        className="todo-input"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button className="add-button">Add Task</button>
    </form>
  );
}

export default TodoForm;
