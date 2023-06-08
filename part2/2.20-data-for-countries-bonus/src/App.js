import {useState, useEffect} from 'react'
import './App.css';
import countriesService from "./services/countries"
import weatherService from "./services/weather"
import weather from './services/weather';

function App() {
  const [currCountry, setCurrCountry ] = useState("")
  const [countries, setCountries ] = useState([])
  const [filterKeyword, setFilterKeyword] = useState("")
  const [debugMsg, setDebugMsg ] = useState(null)

  const hook = () => {
    countriesService.getAll()
      .then(data => {
        setCountries(data)
      })
  }

  useEffect(hook, [])

  const filterKeywordHandler = (event) => {
    setFilterKeyword(event.target.value)
  }

  const countryButtonHandler = (cname) => {
    setFilterKeyword(cname)
  }

  const countryFilter = (country) => country.name.common.toLowerCase().includes(filterKeyword.toLocaleLowerCase())

  return (
    <div className="App">
      <Filter value={filterKeyword} onChange={filterKeywordHandler}/>
      <FilterResult countries={countries.filter(countryFilter)} btnhandler={(x) => countryButtonHandler(x)} />
    </div>
  );
}

const Country = ({ country, btnhandler }) => {
  if(!country) {return null}
  
  return (<div>{country.name.common} <button type="submit" onClick={() => btnhandler(country.name.common)}>show</button></div>)
}

const CountryFull = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <Languages country={country}/>
      <Weather country={country}/>
    </>
  )
}

const Filter = ({ value, onChange }) => (<div>Filter: <input value={value} onChange={onChange} /></div>)

const FilterResult = ({countries, btnhandler}) => {
  console.log("filterresult:", countries, countries.length)
  if(!countries) {return null}

  if(countries.length >= 10) {return <div>Too many results. Please refine query</div>}

  if(countries.length == 1) {return <div><CountryFull country={countries[0]}/></div>}

  return <div>{countries.map( c => <Country country={c} key={c.cca2} btnhandler={(x) => btnhandler(x)}/>)}</div>
}

const Languages = ({country}) => {
  if(!country) {return null}

  return (
    <>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li>{lang}</li>)}
      </ul>
      <img src={country.flags.png}/>
    </>
  )
}

const DebugMsg = ({msg}) => {
  if(!msg) {return null}
  return <div class="debug">{msg}</div>
}

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  const weatherhook = () => {
    weatherService.getWeather(country)
    .then(data => setWeatherData(data))
  }

  useEffect(weatherhook, [country])

  console.log('weather', weatherData)

  if(!weatherData) return null;

  return (
    <div>
      <h2>Weather in {country.name.common}</h2>
      <div>Temperature: {weatherData.current.weather.temp}</div>
    // icon
    </div>

  )
} 

export default App;
