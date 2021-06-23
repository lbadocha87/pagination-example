import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);


  const getData = (pageNo) => {
    axios.get('https://swapi.dev/api/planets/?page=' + pageNo)
      .then(res => {
        setData(res.data.results)
      });
  }


  useEffect(() => {
    axios.get('https://swapi.dev/api/planets/')
      .then(res => {
        let links = [];
        for(let i = 1; i<=Math.ceil(res.data.count/10); i++) {
          links.push(<span key={i} onClick={()=>setPage(i)}>{i}</span>);
        }
        setPagination(links)
      });

    getData(page);
  }, [page])


  return (
    <div className="App">

      <h2>Page {page}</h2>
      {data.map((planet, index) => {
        return (
          <div key={index}>
            <h3>{planet.name}</h3>
          </div>
        )
      })}

      <div className="pagination">
        {pagination}
      </div>
    </div>
  );
}

export default App;
