import './App.scss';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import BarChart from './components/BarChart/BarChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';

function App() {

  return (
    <div>
      <Header />
      <Form />
      <div className='graphs'>
        <BarChart />
        <ScatterPlot />
      </div>
    </div>
  );
}

export default App;