import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch todos on mount
  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setText('');
      })
      .catch(console.error);
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo List</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
