import './App.css';
import Header from './components/Header';
import BarChart from './components/BarChart';
import ScatterPlot from './components/ScatterPlot';

function App() {

  return (
    <div>
      <Header/>
      <div className='graphs'>
        <BarChart />
        <ScatterPlot />
      </div>
     
    </div>
  );
}

export default App;
