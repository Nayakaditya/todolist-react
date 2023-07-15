import React, { useState } from "react";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const handleUpdate = () => {
    setEditMode(true);
  };

  const handleInputChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (updatedTitle.trim() !== "") {
      updateTodo(todo.id, updatedTitle);
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={updatedTitle}
            onChange={handleInputChange}
            className="border border-neutral-700 rounded-md py-2 px-3 w-full"
          />
          <button type="submit">
            <i class="fa-solid fa-floppy-disk"></i>Save
          </button>
        </form>
      ) : (
        <>
          <div className="flex gap-5">
            <span className="py-3 px-5 w-full bg-blue-200 hover:scale-105 transition-all rounded-sm hover:shadow-2xl">
              {todo.title}
            </span>
            <div className="flex space-x-2">
              <button onClick={handleUpdate} title="Update">
                {" "}
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button onClick={handleDelete} title="Delete">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
