import {useState, useEffect} from 'react'
import './App.css';
import countriesService from "./services/countries"

function App() {
  const [currCountry, setCurrCountry ] = useState("")
  const [countries, setCountries ] = useState([])
  const [filterKeyword, setFilterKeyword] = useState("")

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

  const countryFilter = (country) => country.name.common.toLowerCase().includes(filterKeyword.toLocaleLowerCase())

  return (
    <div className="App">
      <Filter value={filterKeyword} onChange={filterKeywordHandler}/>
      <FilterResult countries={countries.filter(countryFilter)}/>
      <Country name={!currCountry? "" : currCountry.name.common}/>
    </div>
  );
}

const Country = ({name, country}) => {
  if(!country) {return null}
  
  return (<div>{name}{country.name.common}</div>)
}

const CountryFull = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital.toString()}</div>
      <div>area: {country.area}</div>
      <Languages country={country}/>
    </>
  )
}


const Filter = ({ value, onChange }) => (<div>Filter: <input value={value} onChange={onChange} /></div>)

const FilterResult = ({countries}) => {
  console.log("filterresult:", countries, countries.length)
  if(!countries) {return null}

  if(countries.length >= 10) {return <div>Too many results. Please refine query</div>}

  if(countries.length == 1) {return <div><CountryFull country={countries[0]}/></div>}

  return <div>{countries.map( c => <Country country={c} key={c.cca2}/>)}</div>
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

export default App;
