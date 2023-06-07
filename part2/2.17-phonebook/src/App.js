import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterKeyword, setFilterKeyword] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const DEV_SERVER = 'http://localhost:3001/persons'

  const hook = () => {
    personService.getAll()
      .then(data => setPersons(data))
  }

  useEffect(hook, [])

  const saveHandler = (event) => {
    event.preventDefault()
    console.log('clicked', event)

    const newPerson = { name: newName, number: newNumber}

    // check for dupe
    const duplicates = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    if (duplicates.length > 0) {
      alert(`${newPerson.name} is already in Phonebook`)
    }
    else
    {
      // saving/post
      // note: POSTing appends to json []
      // note: id field automatically created by JSON server
      personService.create(newPerson)
        .then(data => setPersons(persons.concat(data)))
    }
    setNewName('')
    setNewNumber('')
  }

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const filterKeywordHandler = (event) => {
    setFilterKeyword(event.target.value)
  }

  const filterFunc = (person) => person.name.toLowerCase().includes(filterKeyword.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterKeyword} onChange={filterKeywordHandler} />
      <h2>Add New</h2>
      <form>
        <div>name: <input value={newName} onChange={nameChangeHandler}/></div>
        <div>number: <input value={newNumber} onChange={newNumberHandler}/></div>
        <div><button type="submit" onClick={saveHandler}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons.filter(filterFunc)}/>
    </div>
  )
}

const Filter = ({ value, onChange }) => (<div>Filter: <input value={value} onChange={onChange} /></div>)

const Persons = ({ persons }) => <table><tbody>{persons.map(p => <Person person={p} key={p.name} />)}</tbody></table>

const Person = ({person}) => (<tr><td>{person.name}</td><td>{person.number}</td></tr>)

export default App
