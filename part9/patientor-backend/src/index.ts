
import express from 'express';
import cors from 'cors';
import diagnoses from '../data/diagnoses';

const app = express();
app.use(express.json());

// to allow our frontend to access endpoints
app.use(cors());

import patientsRouter from "./routes/patients";

const PORT = 3001;

app.use('/api/patients', patientsRouter);

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});