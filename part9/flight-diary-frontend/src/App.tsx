import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'

import './App.css';

function App() {
  const [weatherEntries, setWeatherEntries ] = useState<WeatherEntry[]>([])

  useEffect(() => {
    const serverDataUrl = 'http://localhost:3001/api/diaries'
    axios.get<WeatherEntry[]>(serverDataUrl).then(res =>setWeatherEntries(res.data))
  }, [])

  return <Entries entries={weatherEntries} />
}

type WeatherEntry = {
  id: number,
  date: string,
  weather: string,
  visibility: string
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