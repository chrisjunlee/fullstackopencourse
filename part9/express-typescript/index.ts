import express from 'express'
import {calculateBmi} from './bmiCalculator'
import {calculateExercises} from './exerciseCalculator'

// express setup
const app = express();
app.use(express.json())

app.post('/exercises', (req, res) => {
  console.log('req.body', req.body)
  const {daily_exercises, target} = req.body
  res.send(calculateExercises(daily_exercises, target))
})

app.get('/bmi', (req, res) => {
  let mass = Number(req.query.weight)
  let height = Number(req.query.height)
  const bmi = calculateBmi(height, mass)
  const resObj = {weight: mass, height: height, bmi: bmi}
  res.send(resObj);
});

app.get('/ping', (_req, res) => {
  console.log(calculateBmi(100,10))
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});