import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [temperature, setTemp ] = useState('')
  const [wind, setWind ] = useState('')
  const [weathericon, setWeatherIcon ] = useState('')

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log("api", api_key);
    console.log('weather effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then(response => {
        console.log('promise fulfilled')
        const current = response.data.current
        setTemp(current.temperature)
        setWind(current.wind_speed + " mph direction " + current.wind_dir)
        setWeatherIcon(current.weather_icons)
        console.log(response.data);
      })
  }, [city])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temp: {temperature}</p>
      <p>wind: {wind}</p>
      <img src={weathericon} alt=""></img>
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
          {country.languages.map(language => 
            <li key={language.iso639_2}>{language.name}</li>
            )}
          </ul>
          <img width="100" src={country.flag} alt="flag"/>
          <Weather city={country.capital}></Weather>
      </div>
  )
}

const Countries = ({countries, onChangeFunction}) => {
  console.log(onChangeFunction)
  if(countries.length === 1)
  {
    return (
      <Country country={countries[0]}></Country>
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
          <li key={country.alpha3Code}>{country.name} <button onClick={onChangeFunction()} value = {country.name} key={country.alpha3Code}>Show</button></li>
        )}
      </ul>
    )
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue ] = useState('')

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
      <Countries countries={countriesToShow} onChangeFunction={() => handleFilterChange}></Countries>
    </div>
    )
}

export default App;
