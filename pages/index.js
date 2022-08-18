import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todos, setTodo] = useState([
    { title: "James", completed: false },
    { title: "Putter", completed: false },
  ]);
  const [toDoInputs, setToDoInputs] = useState("");

  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    //if using (!todoStr) it will check if the condition is undefined, null, 0, "" ,So, it prefer to be (todoStr === null)
    if (todoStr === null) setTodo([]);
    else setTodo(JSON.parse(todoStr));
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    saveTodos();
  }, [todos]);

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodo(newTodos);
  };

  const markTodo = (idx) => {
    // negate the completed property
    todos[idx].completed = !todos[idx].completed;
    setTodo([...todos]);
  };

  const moveUp = (idx) => {
    //check
    if (idx - 1 >= 0) {
      const rest = todos[idx - 1];
      todos[idx - 1] = todos[idx];
      todos[idx] = rest;
      setTodo([...todos]);
    } else {
      //When idx has exceeded the noninteger number
      return;
    }
  };

  const moveDown = (idx) => {
    //check
    if (idx + 1 < todos.length) {
      const rest = todos[idx + 1];
      todos[idx + 1] = todos[idx];
      todos[idx] = rest;
      setTodo([...todos]);
    } else {
      //When idx has exceeded the length of array todos
      return;
    }
  };

  const onKeyUpHandler = (e) => {
    if (e.key !== "Enter") return;
    const newtodo = [{ title: toDoInputs, completed: false }, ...todos];
    setTodo([...newtodo]);
    setToDoInputs("");
  };

  const saveTodos = () => {
    const todosStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todosStr);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => {
            setToDoInputs(e.target.value);
          }}
          value={toDoInputs}
          onKeyUp={onKeyUpHandler}
        />

        {todos.map((todo, i) => (
          <Todo
            title={todo.title}
            completed={todo.completed}
            key={i}
            onDelete={() => deleteTodo(i)}
            onMark={() => markTodo(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((e) => e.completed === false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((e) => e.completed === true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Raiwin Inthasit 640610665
        </p>
      </div>
    </div>
  );
}
