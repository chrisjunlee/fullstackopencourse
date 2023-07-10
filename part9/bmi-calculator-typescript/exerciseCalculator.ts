
interface ExerciseStats {
  days: number
  trainingDays: number
  target: number
  actual: number
  goalAchieved: boolean
  score: number
  message: string
}

const calculateExercises = (exerciseLog: number[], target: number): ExerciseStats => {
  let stats = <ExerciseStats>{}

  stats.days = exerciseLog.length
  stats.trainingDays = exerciseLog.filter(day => day > 0).length
  stats.target = target
  stats.actual = exerciseLog.reduce((acc, d) => acc + d, 0)/exerciseLog.length
  stats.goalAchieved = stats.actual >= target? true : false
  stats.score = stats.goalAchieved? 3 : 0
  stats.message = "something motivational"

  return stats
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))