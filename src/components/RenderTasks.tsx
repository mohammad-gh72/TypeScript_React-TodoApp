import { Task } from "../types/Task";
import { useState } from "react";

interface RenderTasksProps {
  setTodo: React.Dispatch<React.SetStateAction<Task[]>>;
  todo?: Task[];
}

function RenderTasks({ todo, setTodo }: RenderTasksProps) {
  function handleIsTaskDone(id: number) {
    setTodo((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  return (
    <ul className="todo-list">
      {todo?.map((task) => (
        <List
          key={task.id}
          handleIsTaskDone={handleIsTaskDone}
          setTodo={setTodo}
          todo={todo}
          task={task}
        />
      ))}
    </ul>
  );
}

export default RenderTasks;

interface ListProps extends RenderTasksProps {
  task: Task;
  handleIsTaskDone: (id: number) => void;
}

// Each Elemnt of List

function List({ task, setTodo, handleIsTaskDone }: ListProps) {
  const [editInput, setEditInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  function handleEditTask(id: number, task: string) {
    setEditInput(task);
    setIsEdit(!isEdit);
    setTodo((prev) =>
      prev.map((task) => (task.id === id ? { ...task, task: editInput } : task))
    );
    if (!editInput.trim() && isEdit) {
      setTodo((prev) => prev.filter((task) => task.id !== id));
    }
  }

  function handleDeleteTask(id: number) {
    setTodo((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <>
      <li className={`todo-item ${task.isCompleted ? "completed" : ""}`}>
        {isEdit || (
          <input
            type="checkbox"
            checked={task.isCompleted}
            className="checkbox"
            onChange={() => {
              handleIsTaskDone(task.id);
            }}
          />
        )}
        {isEdit ? (
          <input
            style={{ width: "90%" }}
            type="text"
            value={editInput}
            onChange={(e) => {
              setEditInput(e.target.value);
            }}
          />
        ) : (
          <span className="task-text">{task.task}</span>
        )}
        <button
          className="edit-button"
          onClick={() => handleEditTask(task.id, task.task)}
        >
          Edit
        </button>
        {isEdit || (
          <button
            className="delete-button"
            onClick={() => {
              handleDeleteTask(task.id);
            }}
          >
            Delete
          </button>
        )}
      </li>
    </>
  );
}
