const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10},
      { name: 'Using props to pass data',exercises: 7},
      { name: 'State of a component',exercises: 14}
    ]
  }

    return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => (<h1>{props.course} </h1>)
const Total = (props) => {
  let total = props.parts.reduce((partialSum, part) => partialSum + part.exercises, 0)
  return (<p>Number of exercises {total}</p>)
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part part={part.name} name={part.exercises}/>)}
    </div>
  )
}

const Part = (props) => (<p>{props.part} {props.name}</p>)

export default App