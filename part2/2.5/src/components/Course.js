const Course = ({course}) =>
{
    const {parts} = course
    return (
        <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total sum={parts.reduce( (acc, part) => acc + part.exercises, 0)} />
        </div>  
        )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => 
  <>
  {parts.map( part => <Part key={part.id} part={part}/>)}
  </>

export default Course