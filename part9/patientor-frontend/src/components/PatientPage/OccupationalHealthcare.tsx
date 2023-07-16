import {Entry} from '../../types'
import BaseEntry from './BaseEntry'

interface OccupationalHealthcareProps { entry: Entry }
const OccupationalHealthcare = (props: OccupationalHealthcareProps ) => { 
  const entry = props.entry;
  return <BaseEntry entry={entry}/>
}

export default OccupationalHealthcare