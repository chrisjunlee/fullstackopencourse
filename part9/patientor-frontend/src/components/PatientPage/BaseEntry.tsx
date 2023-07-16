import {Diagnosis, Entry} from '../../types'
import { DiagnosisContext } from '../../DiagnoseContext'
import { useContext } from 'react'

interface BaseEntryProps { entry: Entry }
const BaseEntry = (props: BaseEntryProps) => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [diagnosisCodes, setDiagnosisCodes] = useContext(DiagnosisContext);

  console.log('HERE diagnosisCodes', diagnosisCodes)

  const entry = props.entry;
  return (
    <div>{entry.date} {entry.description}
      {entry.diagnosisCodes
        ? <ul> { entry.diagnosisCodes.map((dCode, index) => 
          <li key={index}>{dCode}: {codeToDescription(dCode, diagnosisCodes)} </li>)} </ul> 
        : null }
    </div>
  )
}

const codeToDescription = (code: string, diagnosisMap: Diagnosis[] | undefined): string => {
  const diagnosis = diagnosisMap?.find(d => d.code === code)
  console.log('diagnosis', diagnosis)
  return diagnosis? diagnosis.name :  code
}

export default BaseEntry