let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require ('cors');

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.method);
//   console.log(req.path);
//   console.log(req.body);
//   console.log('--------------------');
//   next();
// });
app.use(cors());


app.listen(PORT, () => {
  console.log('server running on port' + PORT);
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  res.json(note);
});
app.get('/api/notes/important/:boolean', (req, res) => {
  const boolean = req.params.boolean;
  const note = notes.filter((note) => String(note.important) === boolean);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log({ id });
  notes = notes.filter((note) => note.id !== id);
  console.log({ notes });
  res.status(204).end();
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' || false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];
  res.status(201).json(newNote);
});
