import { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup, Alert } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      setTodos(todos);
    } catch (error: any) {
      setErrorMessage("Failed to fetch todos.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to remove todo.");
    }
  };

  const createTodo = async () => {
    try {
      const todos = await client.createTodo();
      setTodos(todos);
    } catch (error: any) {
      setErrorMessage("Failed to create todo.");
    }
  };

  const postTodo = async () => {
    try {
      const newTodo = await client.postTodo({ title: "New Posted Todo", completed: false });
      setTodos([...todos, newTodo]);
    } catch (error: any) {
      setErrorMessage("Failed to post new todo.");
    }
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to delete todo.");
    }
  };

  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to update todo.");
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <Alert variant="danger" id="wd-todo-error-message" className="mb-2 mt-2">
          {errorMessage}
        </Alert>
      )}

      <h4>
        Todos
        <FaPlusCircle onClick={createTodo} className="text-success float-end fs-3" id="wd-create-todo" />
        <FaPlusCircle onClick={postTodo} className="text-primary float-end fs-3 me-3" id="wd-post-todo" />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <FaTrash onClick={() => removeTodo(todo)} className="text-danger float-end mt-1" id="wd-remove-todo" />
            <TiDelete onClick={() => deleteTodo(todo)} className="text-danger float-end me-2 fs-3" id="wd-delete-todo" />
            <FaPencil onClick={() => editTodo(todo)} className="text-primary float-end me-2 mt-1" />

            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              checked={todo.completed}
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
            />

            {!todo.editing ? (
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}