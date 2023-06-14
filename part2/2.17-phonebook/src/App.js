import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterKeyword, setFilterKeyword] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

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
    console.log(duplicates)
    if (duplicates.length > 0) {
      
      let duPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase());

      if (window.confirm(`${duPerson.name} is already in phonebook. Update phone number?`)) {
        let updatedPerson = {...duPerson, number: newNumber}
        personService.update(updatedPerson.id, updatedPerson)
          .then(setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p)))
          .catch(err => {
            setErrMessage(err.response.data.error)
            setTimeout(() => setErrMessage(null), 2000)
            setSuccessMessage(null)
          })
      }
    }
    else {
      // saving/post
      // note: POSTing appends to json []
      // note: id field automatically created by JSON server
      personService.create(newPerson)
        .then(data => setPersons(persons.concat(data)))
        .then(setSuccessMessage(`${newPerson.name} added`))
        .catch(err => {
          setErrMessage(err.response.data.error)
          setTimeout(() => setErrMessage(null), 2000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteHandlerOf = (id) => {
    if(window.confirm(`Do you want to delete ${persons.find(p => p.id === id).name}?`)) {
      personService.deletePersonById(id)
        .then(setPersons(persons.filter( p => p.id !== id)))
    }
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
      <NotifyError message={errMessage} />
      <NotifySuccess message={successMessage} />
      <h2>Phonebook</h2>
      <Filter value={filterKeyword} onChange={filterKeywordHandler} />
      <h2>Add New</h2>
      <form>
        <div>name: <input value={newName} onChange={nameChangeHandler}/></div>
        <div>number: <input value={newNumber} onChange={newNumberHandler}/></div>
        <div><button type="submit" onClick={saveHandler}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <table><tbody>
        {persons.map(p => <Person person={p} key={p.name} delHandler={() => deleteHandlerOf(p.id)} />)}
      </tbody></table>
    </div>
  )
}

const Filter = ({ value, onChange }) => (<div>Filter: <input value={value} onChange={onChange} /></div>)

const Persons = ({ persons, delHandler }) => 
  <table><tbody>
    {persons.map(p => <Person person={p} key={p.name} delHandler={delHandler} />)}
  </tbody></table>

const Person = ({ person, delHandler }) =>
  <tr>
    <td><button type="submit" onClick={delHandler}>delete</button></td>
    <td>{person.name}</td><td>{person.number}</td><td>{person.id}</td>
  </tr>

const NotifyError = ({ message }) => {
  if (message === null) { return null }
  return (<div className="error"> {message}</div>)
}

const NotifySuccess = ({ message }) => {
  if (message === null) { return null }
  return (<div className="success"> {message}</div>)
}

export default App