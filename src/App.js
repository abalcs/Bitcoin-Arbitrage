import './App.scss';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import BarChart from './components/BarChart/BarChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';
import { useEffect, useState } from 'react';

// const API_KEY = require('dotenv').config();
// console.log(API_KEY)

function App() {
  const [data, setData] = useState([]);
  const [btc, setBtc] = useState()

  let myHeaders = new Headers();
  myHeaders.append("X-CoinAPI-Key", "9BE033FA-26F0-44DC-8530-D5404A74330D");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const getAll = () => {
     fetch("http://localhost:5050/")
    .then(response => response.json())
    .then(result => setData(result))
    .catch(error => console.log('error', error));
  }

  const getPrice = async () => {
    await fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', requestOptions)
    .then(response => response.json())
    .then(result => setBtc(result.rate))
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
      getAll();
      getPrice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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