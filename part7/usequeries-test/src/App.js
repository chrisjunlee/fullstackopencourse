import './App.css';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios'

function App() {
  const testFun = () => {
    return axios.get("http://localhost:3003/api/blogs").then((res) => res.data);
  };


  const testQuery = useQuery("testQ", testFun)

  const results = useQueries({
    queries: [
      { queryKey: ["post", 1], queryFn: testFun, staleTime: Infinity }
    ]
  });

  if(testQuery.isLoading) {return null}

  const data = testQuery.data

  return (
    <div>{data.map(ob => ob.title)}</div>
  );
}

export default App;
