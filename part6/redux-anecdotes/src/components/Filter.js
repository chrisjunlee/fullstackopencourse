import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const filterAnec = (event) => {
      const filterValue = event.target.value
      dispatch(filterChange(filterValue))
    }
  return (
    <>
    <h2>Filter</h2>
    <input type="text" name="filter" onChange={filterAnec} />
    </>
  )
}

export default Filter