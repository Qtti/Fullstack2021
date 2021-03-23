import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import personsService from './services/persons'


const Filter = (props) => {

  return (
    <div>
       filter shown with<input value={props.value} onChange={props.handleChange()}></input>
    </div>
  )
}

const PersonForm = (props) => {
  return (
  <div>
    <form onSubmit={props.addPersonFunction()}>
      <div>
        name: <input
        value={props.newName}
        onChange={props.handleNameChangeFunction()}
      />
      </div>
      <div>
        Number: <input
        value={props.newNumber}
        onChange={props.handleNumberChangeFunction()}
      />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>)
}

const Persons = ({personsToShow}) => {
  return (
    <div>
      <ul>
      {personsToShow.map(person => 
        <li key={person.name}>{person.name} {person.number}</li>
      )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
      personsService
        .getAll()
        .then(response => {
          //console.log(response)
          setPersons(response)
        })
  }, [])
  //console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()

    console.log("newName:", newName)
    console.log("persons:", persons)
    console.log(persons.some(person => person.name === newName))

    if(persons.some(person => person.name === newName))
    {
      console.log("duplicate value")    
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')  
          setNewNumber('')  
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const personsToShow = (!filterValue || 0 === filterValue.length) ? persons : persons.filter(person => person.name.toLowerCase().search(filterValue.toLowerCase()) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handleChange={() => handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm  newName={newName} addPersonFunction={() => addPerson} 
                newNumber={newNumber} 
                handleNameChangeFunction={() => handleNameChange} 
                handleNumberChangeFunction={() => handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow}></Persons>
    </div>
  )

}

export default App