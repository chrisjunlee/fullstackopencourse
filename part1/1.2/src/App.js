const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const partsarr = [
    { part: part1, exercise: exercises1 },
    { part: part2, exercise: exercises2 },
    { part: part3, exercise: exercises3 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={partsarr}/>
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => (<h1>{props.course} </h1>)
const Total = (props) => (<p>Number of exercises {props.total}</p>)

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part part={part.part} name={part.exercise}/>)}
    </div>
  )
}

const Part = (props) => (<p>{props.part} {props.name}</p>)

export default App