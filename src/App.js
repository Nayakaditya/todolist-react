import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const sortedTodos = response.data.sort((a, b) => b.id - a.id);
      setTodos(sortedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo
      );
      const updatedTodos = [response.data, ...todos];
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, updatedTitle) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          title: updatedTitle,
          completed: true,
        }
      );
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="text-center font-bold text-2xl py-2 w-full fixed top-0 bg-white">
        Todo App
      </h1>
      <hr className="mb-5" />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        addTodo={addTodo}
      />
    </div>
  );
}

export default App;
