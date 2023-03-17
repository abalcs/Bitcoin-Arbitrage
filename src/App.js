import './App.css';
import Header from './components/Header';
import BarChart from './components/BarChart';
import ScatterPlot from './components/ScatterPlot';
import Form from './components/Form';

function App() {

  return (
    <div>
      <Header/>
      <Form />
      <div className='graphs'>
        <BarChart />
        <ScatterPlot />
      </div>
     
    </div>
  );
}

export default App;
