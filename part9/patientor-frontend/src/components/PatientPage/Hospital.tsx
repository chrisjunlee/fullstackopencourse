import {Entry} from '../../types'
import BaseEntry from './BaseEntry'

interface HospitalProps { entry: Entry }
const Hospital = (props: HospitalProps ) => {
  const entry = props.entry;
  return <BaseEntry entry={entry}/>
}

export default Hospital