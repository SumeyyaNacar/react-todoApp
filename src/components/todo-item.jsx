import React from "react";
import { LuTrash } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";

export const TodoItem = ({ todo, toggle, deleteTodo, completed }) => {
  return (
    <div className={`task ${completed ? "completed" : ""}`}>
      <p>{todo.text}</p>

      {!completed && (
        <div className="icons">
          <MdOutlineDone onClick={() => toggle(todo.id)} />
          <LuTrash onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
    </div>
  );
};