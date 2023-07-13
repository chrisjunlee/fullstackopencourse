const App = () => {
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface HeaderProps {
  name: string
}

// render name of the course
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>
}

interface ContentProps {
  courseParts: CoursePart[]
}

// render the names of the different parts and the number of exercises in each part
const Content = (props: ContentProps) => {
  return (<>
    {props.courseParts.map((part, index) => (
        <p key={index} ><Part coursePart={part}/></p>
    ))}
  </>)
}

interface PartProps {
  coursePart: CoursePart
}

const Part = (props: PartProps) => {
  // CoursePartBasic | CoursePartGroup | CoursePartBackground
  const part = props.coursePart
  switch(part.kind) {
    case "basic":
      return <p>{part.name} {part.exerciseCount} <br/> {part.description}</p>
    case "group":
      return <p>{part.name} {part.exerciseCount} <br/> 
        Group Exercises: {part.groupProjectCount} <br/> {part.description}</p>
    case "background":
      return <p>{part.name} {part.exerciseCount} <br/> {part.description} <br/>
        {part.backgroundMaterial}</p>
    default:
      return assertNever(part);
  }
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

const assertNever = (value: never): never => {
  throw new Error( `Unhandled discriminated union member: ${JSON.stringify(value)}` );
};

export default App;