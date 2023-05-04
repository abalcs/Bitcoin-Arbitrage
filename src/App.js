import './App.scss';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import BarChart from './components/BarChart/BarChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';
import StatsBar from './components/StatsBar/StatsBar';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [btc, setBtc] = useState()

  const apiKey = process.env.REACT_APP_API_KEY
  const apiValue = process.env.REACT_APP_API_VALUE

  let myHeaders = new Headers();
  myHeaders.append(apiKey,apiValue)

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const getAll = () => {
     fetch("http://localhost:5050/api/trades")
    .then(response => response.json())
    .then(result => setData(result))
    .catch(error => console.log('error', error));
  }

  const getPrice = () => {
     fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', requestOptions )
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
    <>
      <Header />
      <Form />

      <div className='main'>
        <StatsBar data={data} btc={btc}/>
        <div className='graphs'>
          <BarChart data={data}/>
          <ScatterPlot data={data}/>
        </div>
       
      </div>
      
    </>
  );
}

export default App;