import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import personsService from './services/persons'

const Notification = ({message, type}) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    border: 3,
    borderStyle: "solid",
    borderColor: "green",
    backgroundColor: "lightgrey",
    borderRadius: 5,
    padding: 5,
    margin: 10
  }

  if(type === 'error'){
    notificationStyle.color = 'red'
    notificationStyle.borderColor = 'red'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

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

const Persons = ({personsToShow, deletePersonFunction}) => {
  return (
    <div>
      <ul>
      {personsToShow.map(person => 
        <li key={person.id}>{person.name} {person.number}<button name={person.name} value={person.id} onClick={deletePersonFunction()}>delete</button></li>
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const setNotification = (message, type=null) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  useEffect(() => {
      personsService
        .getAll()
        .then(response => {
          setPersons(response)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log("newName:", newName)
    console.log("persons:", persons)
    console.log("person:", person)

    if(persons.some(person => person.name === newName))
    {
      // update
      if (window.confirm(`Update ${person.name}?`)) 
      {
        console.log("update")    
        
        personsService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.filter(n => n.id !== person.id).concat(returnedPerson))
            setNewName('')  
            setNewNumber('')  
            setNotification(`Person ${newName} updated`)
          })
          .catch(error => {
            setNotification(`the person ${newName}  was already deleted from server`, "error")  
            })

      }
    }
    else
    {
      personsService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')  
            setNewNumber('')  
            setNotification(`Person ${newName} added`)
        })
        .catch(error => {
          console.log(error.response.data)
          setNotification(error.response.data.error , "error")  
          })
    }
  }

  const deletePerson = (event) => {
    const id = event.target.value
    const name = event.target.name

    if (window.confirm(`Delete ${name}?`)) {
      console.log("id:", id)
      //console.log(event.target.value)
      personsService
        .remove(id)
          .then(response => {       
            setPersons(persons.filter(n => n.id !== id))
            setNotification(`Person ${name} deleted`)
        })
        .catch(error => {
          setNotification(`the person ${name} was already deleted from server`, "error")   
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

    console.log(persons.find(person => person.name === event.target.value))
  }

  
  const personsToShow = (!filterValue || 0 === filterValue.length) ? persons : persons.filter(person => person.name.toLowerCase().search(filterValue.toLowerCase()) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter value={filterValue} handleChange={() => handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm  newName={newName} addPersonFunction={() => addPerson} 
                newNumber={newNumber} 
                handleNameChangeFunction={() => handleNameChange} 
                handleNumberChangeFunction={() => handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} deletePersonFunction={() => deletePerson} ></Persons>
    </div>
  )

}

export default App