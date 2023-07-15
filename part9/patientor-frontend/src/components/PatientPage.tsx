import {Patient} from '../types'
import { useParams } from 'react-router-dom'

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
      Occupation: {patient.occupation}
    </div>)
}

export default PatientPage