import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filterKeyword, setFilterKeyword] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const saveHandler = (event) => {
    event.preventDefault()
    console.log('clicked', event)

    const nameObj = { name: newName, number: newNumber}

    // check for dupe
    const duplicates = persons.filter(person => person.name.toLowerCase() === nameObj.name.toLowerCase())
    if (duplicates.length > 0) {
      alert(`${nameObj.name} is already in Phonebook`)
    }
    else
    {
      setPersons(persons.concat(nameObj))
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
