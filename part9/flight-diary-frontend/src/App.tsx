import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { WeatherEntry, NewWeatherEntry } from './types';
import {NewEntryForm} from './components/NewEntryForm'

import './App.css';

function App() {
  const [weatherEntries, setWeatherEntries ] = useState<WeatherEntry[]>([])
  const serverDataUrl = 'http://localhost:3001/api/diaries'

  useEffect(() => {
    axios.get<WeatherEntry[]>(serverDataUrl).then(res =>setWeatherEntries(res.data))
  }, [])

  const newEntryHandler = (event: React.SyntheticEvent, newWeatherEntry: NewWeatherEntry): void => {
      event.preventDefault()
      console.log('newWeatherEntry', newWeatherEntry)
      axios.post(serverDataUrl, newWeatherEntry)
        .then(res => setWeatherEntries(weatherEntries.concat(res.data)))
    }

  return (<>
  <NewEntryForm newEntryHandler={newEntryHandler}/>
  <Entries entries={weatherEntries} />
  </>)
}



type EntriesProps = {entries: WeatherEntry[]}
const Entries = (props: EntriesProps) => {
  const entries = props.entries
  
  return (
  <div>
    <h1>Weather Entries</h1>
    {entries.map(entry => <Entry entry={entry}/>)}
  </div>
  )
}

type EntryProps = { entry: WeatherEntry }
const Entry = (props: EntryProps) => {
  const entry = props.entry 

  return (
    <>
    <h3>{entry.date}</h3>
    <div>Visibility: {entry.visibility}</div>
    <div>Weather: {entry.weather}</div>
    </>
  )
}

export default App;