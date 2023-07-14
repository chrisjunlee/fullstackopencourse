import {NewWeatherEntry, Visibility, Weather} from '../types'
import { useState } from 'react';

type NewEntryFormProps = {
    newEntryHandler: (event: React.SyntheticEvent, newWeatherEntry: NewWeatherEntry) => void
}
const NewEntryForm = (props: NewEntryFormProps) => {
  const [newVisibility, setNewVisibility ] = useState<string>('great')
  const [newWeather, setNewWeather ] = useState<string>('sunny')
  const [newDate, setNewDate ] = useState<string>('2023-07-13')
  const [newComment, setNewComment ] = useState<string>(' ')

  return (
  <div>
    <form>
      <div> Weather: 
        <input value={newWeather} onChange={(event) => {setNewWeather(event.target.value)}}/>
      </div>
      <div> Visibility: 
        <input value={newVisibility} onChange={(event) => {setNewVisibility(event.target.value)}}/>
      </div>
      <div> Date: 
        <input value={newDate} type="date" onChange={(event) => {setNewDate(event.target.value)}}/>
      </div>
      <div> Comment: 
        <input value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
      </div>
      <button type="submit" onClick={(event) => 
        props.newEntryHandler(event, 
        {date: newDate, weather: newWeather as Weather, 
        visibility: newVisibility as Visibility, comment: newComment})}>Add</button>
    </form>
  </div>)
}

export { NewEntryForm};