import './App.scss';

import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header';
import Form from './components/Form/Form';
// import BarChart from './components/BarChart/BarChart';
// import ScatterPlot from './components/ScatterPlot/ScatterPlot';
// import StatsBar from './components/StatsBar/StatsBar';
import Landing from './components/Landing/Landing';

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
     fetch("http://localhost:5050/dashboard/")
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

  // const loggedIn = () => {
  //   fetch('http://localhost:5050/')
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // }

  useEffect(() => {
      getAll();
      getPrice();
      // loggedIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  
    <Router>
      <Header />
        <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={<Form data={data} btc={btc}/>} />
       
        {/*
        <div className='main'>
          
          
          <div className='graphs'>
            
          </div>

        </div>
        */}
      </Routes>
    </Router>
    
  );
}

export default App;