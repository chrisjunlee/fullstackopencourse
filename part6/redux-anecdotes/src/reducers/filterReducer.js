const initialState = ''

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action
  console.log("filterReducer state action: ", state, action);
  
  switch (type) {
    case 'SET_FILTER':
      state = payload
      return state
    default:
      return state
  }
 }

 export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
 }

 export default filterReducer