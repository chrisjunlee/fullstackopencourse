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
      <div> 
        <label htmlFor='weather'>Weather: </label>
        <select name='weather' onChange={(event) => {setNewWeather(event.target.value)}}>
          <option value="sunny">sunny</option>
          <option value="rainy">rainy</option>
          <option value="cloudy">cloudy</option>
          <option value="stormy">stormy</option>
          <option value="windy">windy</option>
        </select>
      </div>
      <div>
        <label htmlFor="visibility">Visibility:</label>
        <select name="visibility" onChange={(event) => {setNewVisibility(event.target.value)}}>
          <option value="great">great</option>
          <option value="good">good</option>
          <option value="ok">ok</option>
          <option value="poor">poor</option>
        </select>
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