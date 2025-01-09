import React, { useEffect, useRef, useState } from "react";
import "./container.scss";
import { BiPlus } from "react-icons/bi";
import { TodoItem } from "./todo-item";
import { Title } from "./title";

export const Container = () => {

 
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  
  const data = useRef();

  const addTodos = () => {
    const inputText = data.current.value.trim();
    if (inputText === "") return null;

    data.current.value = "";
    data.current.focus();
    const newTodo = {
      id: todos.length + 1,
      text: inputText,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

 //counts
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="container">
      {/* input kismi */}
      <div className="inputs">
        <input type="text" ref={data} placeholder="Add a new task" />

        <button onClick={() => addTodos()}>
          <BiPlus className="plus" />
        </button>
      </div>

      {/* Todos and title */}
      {activeCount > 0 && (
        <>
          <Title title="Tasks to do " count={activeCount} />

          {/* Todos */}
          {todos.filter(todo => !todo.completed).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggle={toggle}
              deleteTodo={deleteTodo}
              completed={false}
            />
          ))}
        </>
      )}

      {/* Dones and title */}
      {completedCount > 0 && (
        <>
          <Title title="Done" count={completedCount} className="done" />

          {/* Done  */}
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggle={toggle}
                deleteTodo={deleteTodo}
                completed={true}
              />
            ))}
        </>
      )}
    </div>
  );
};