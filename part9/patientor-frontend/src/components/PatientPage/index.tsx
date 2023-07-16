import {Patient, Entry} from '../../types'
import { useParams } from 'react-router-dom'
import Hospital from './Hospital'
import HealthCheck from './HealthCheck'
import OccupationalHealthcare from './OccupationalHealthcare'

interface Props {
  patients: Patient[]
}

const PatientPage = (props: Props) => {
  const {id} = useParams<{id: string}>();
  const patient = props.patients.find(p => p.id === id)

  if(!patient) {return <div>None found</div>}

  return (
    <div>
      <h2>{patient.name}</h2>
      Occupation: {patient.occupation} <br/><br/>
      {patient.entries.map(entry => <EntryDetails entry={entry}/> )}
    </div>)
}


// const Entries = (props: EntriesProps) => {
//   const entries = props.entries
//   return {entries.map(entry => <EntryDetails entry={entry}/>)}
//   // return (<>
//   //   {entries.map((ent, index) => (
//   //     <div key={index}>
//   //       {ent.date} {ent.description} <br/>
//   //       <ul>
//   //       {ent.diagnosisCodes? ent.diagnosisCodes.map((dCode, index) => <li key={index}>{dCode}</li>) : null }
//   //       </ul>
//   //     </div>
//   //     ))}
//   // </>)
// }

interface EntryDetailsProps { entry: Entry }

const EntryDetails = (props: EntryDetailsProps) => {
  const entry = props.entry

  switch(entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />
    case "HealthCheck":
      return <HealthCheck entry={entry} />
    default:
      return assertNever(entry)
  }
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled Entry type: ${JSON.stringify(value)}`);
}

export default PatientPage