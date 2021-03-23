import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries}) => {
  if(countries.length === 1)
  {
    return (
      <div>
          <h1>{countries[0].name}</h1>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h2>languages</h2>
          <ul>
          {countries[0].languages.map(language => 
            <li key={language.iso639_2}>{language.name}</li>
            )}
          </ul>
          <img width="100" src={countries[0].flag} alt="flag"/>
      </div>
    )

  }
  else if(countries.length > 10)
  {
    return (
      <ul>
          <li>Too many countries, specify another filter</li>
      </ul>
    )
  }
  
  else
  {
    return (
      <ul>
        {countries.map(country => 
          <li key={country.alpha3Code}>{country.name}</li>
        )}
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const countriesToShow = (!filterValue || 0 === filterValue.length) ? countries : countries.filter(countries => countries.name.toLowerCase().search(filterValue.toLowerCase()) > -1)

  return(
    <div>
      find countries<input value={filterValue} onChange={handleFilterChange}></input>
      <div>
        <Countries countries={countriesToShow}></Countries>
      </div>
    </div>
    )
}

export default App;
