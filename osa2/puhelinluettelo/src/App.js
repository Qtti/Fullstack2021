import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const addPerson= (event) => {
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
      
      setPersons(persons.concat(personObject))
      setNewName('')  
      setNewNumber('')  
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
      <div>
       filter shown with<input value={filterValue} onChange={handleFilterChange}></input>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          Number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App