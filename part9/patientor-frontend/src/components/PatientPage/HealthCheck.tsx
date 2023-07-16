import {Entry} from '../../types'
import BaseEntry from './BaseEntry'

interface HealthCheckProps { entry: Entry }
const HealthCheck = (props: HealthCheckProps ) => { 
  const entry = props.entry;
  return <BaseEntry entry={entry}/>
}

export default HealthCheck