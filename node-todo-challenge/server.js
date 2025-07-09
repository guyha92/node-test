const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const todo = { id: nextId++, text };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
