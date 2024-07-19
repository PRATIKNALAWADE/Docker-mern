// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { text })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo._id === id);
    axios.patch(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed })
      .then(res => setTodos(todos.map(todo => todo._id === id ? res.data : todo)))
      .catch(err => console.log(err));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span onClick={() => toggleComplete(todo._id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
