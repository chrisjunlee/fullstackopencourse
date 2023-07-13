const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};


interface HeaderProps {
  name: string
}

// render name of the course
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>
}

interface CoursePart {
    name: string,
    exerciseCount: number
  }

interface ContentProps {
  courseParts: CoursePart[]
}

// render the names of the different parts and the number of exercises in each part
const Content = (props: ContentProps) => {
  return (<>
    {props.courseParts.map((part, index) => (
        <p key={index} >{part.name} {part.exerciseCount}</p>
    ))}
  </>)
}

interface TotalProps {
  courseParts: CoursePart[]
}

// render the total sum of exercises in all parts.
const Total = (props: TotalProps) => {
  return (<p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>)
}

export default App;