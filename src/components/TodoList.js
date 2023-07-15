// src/components/TodoList.js

import React, { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, updateTodo, deleteTodo, addTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleInputChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodoTitle.trim() !== "") {
      addTodo({
        title: newTodoTitle,
        completed: false,
      });
      setNewTodoTitle("");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 md:max-w-xl lg:max-w-3xl">
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={handleInputChange}
          placeholder="Enter title"
          className="flex-grow px-4 py-2 rounded-l-md border focus:outline-1 focus:outline-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors duration-300"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">
            <TodoItem
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
