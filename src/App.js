import './App.scss';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import BarChart from './components/BarChart/BarChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [btc, setBtc] = useState()

  const getAll = async () => {
    await fetch("http://localhost:5050/")
    .then(response => response.json())
    .then(result => setData(result))
    .catch(error => console.log('error', error));
  }

  const getPrice = async () => {
    await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then((res) => res.json())
    .then((data) => setBtc(data.bitcoin.usd))    
    .catch((e) => console.error(e))
  }

  useEffect(() => {
      getAll();
      getPrice()
  }, [])

  return (
    <div>
      <Header data={data} btc={btc}/>
      <Form />
      <div className='graphs'>
        <BarChart data={data}/>
        <ScatterPlot data={data}/>
      </div>
    </div>
  );
}

export default App;